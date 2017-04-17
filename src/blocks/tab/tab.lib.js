import Util from '../../js/utils/util'

const Tab = (($) => {


  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME                = 'tab'
  const VERSION             = '4.0.0-alpha.6'
  const DATA_KEY            = 'bs.tab'
  const EVENT_KEY           = `.${DATA_KEY}`
  const DATA_API_KEY        = '.data-api'
  const JQUERY_NO_CONFLICT  = $.fn[NAME]
  const TRANSITION_DURATION = 150

  const Event = {
    HIDE           : `hide${EVENT_KEY}`,
    HIDDEN         : `hidden${EVENT_KEY}`,
    SHOW           : `show${EVENT_KEY}`,
    SHOWN          : `shown${EVENT_KEY}`,
    CLICK_DATA_API : `click${EVENT_KEY}${DATA_API_KEY}`
  }

  const ClassName = {
    DROPDOWN_MENU            : 'dropdown__menu',
    DROPDOWN_TOGGLE_ACTIVE   : 'dropdown__toggle--active',
    DROPDOWN_CHILD_ACTIVE    : 'dropdown__item--active',
    TAB_ACTIVE               : 'tab__link-wrap--active',
    CONTENT_ACTIVE           : 'tab__content-item--active',
    DISABLED                 : 'tab__link-wrap--disabled',
    FADE                     : 'fade',
    SHOW                     : 'show'
  }

  const Selector = {
    DROPDOWN              : '.dropdown',
    NAV_LIST_GROUP        : '.tab__links',
    TAB_ACTIVE            : '.tab__link-wrap--active',
    CONTENT_ACTIVE        : '.tab__content-item--active',
    DATA_TOGGLE           : '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE       : '.dropdown__toggle',
    DROPDOWN_TOGGLE_ACTIVE: '.dropdown__toggle--active',
    DROPDOWN_ACTIVE_CHILD : '.dropdown__menu .dropdown__item--active'
  }


  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class Tab {

    constructor(element) {
      this._element = element
    }


    // getters

    static get VERSION() {
      return VERSION
    }


    // public

    show() {
      if (this._element.parentNode &&
          this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
          $(this._element).parent().hasClass(ClassName.ACTIVE) ||
          $(this._element).parent().hasClass(ClassName.DISABLED)) {
        return
      }

      let target
      let previous
      const listElement = $(this._element).closest(Selector.NAV_LIST_GROUP)[0]
      const selector    = Util.getSelectorFromElement(this._element)

      if (listElement) {
        previous = $.makeArray($(listElement))
        previous = previous[previous.length - 1]
      }

      const hideEvent = $.Event(Event.HIDE, {
        relatedTarget: this._element
      })

      const showEvent = $.Event(Event.SHOW, {
        relatedTarget: previous
      })

      if (previous) {
        $(previous).trigger(hideEvent)
      }

      $(this._element).trigger(showEvent)

      if (showEvent.isDefaultPrevented() ||
         hideEvent.isDefaultPrevented()) {
        return
      }

      if (selector) {
        target = $(selector)[0]
      }


      this._activate(
        this._element,
        listElement
      )

      const complete = () => {
        const hiddenEvent = $.Event(Event.HIDDEN, {
          relatedTarget: this._element
        })

        const shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: previous
        })

        $(previous).trigger(hiddenEvent)
        $(this._element).trigger(shownEvent)
      }

      if (target) {
        this._activate(target, target.parentNode, complete)
      } else {
        complete()
      }
    }

    dispose() {
      $.removeClass(this._element, DATA_KEY)
      this._element = null
    }


    // private

    _activate(element, container, callback) {
      const tab = $(element).hasClass('tab__link')
      const dropdown = $(element).hasClass('dropdown__item')
      let active

      if (tab) {
        active = $(container).find(Selector.TAB_ACTIVE)[0]
        this._addHash(element)
      } else if (dropdown) {
        active = $(container).find('.dropdown__toggle')[0]
        this._addHash(element)
      } else {
        active = $(container).find(Selector.CONTENT_ACTIVE)[0]
      }

      const isTransitioning = callback
        && Util.supportsTransitionEnd()
        && (active && $(active).hasClass(ClassName.FADE))

      const complete = () => this._transitionComplete(
        element,
        active,
        isTransitioning,
        callback
      )

      if (active && isTransitioning) {
        $(active)
          .one(Util.TRANSITION_END, complete)
          .emulateTransitionEnd(TRANSITION_DURATION)

      } else {
        complete()
      }

      if (active) {
        $(active).removeClass(ClassName.SHOW)
      }
    }

    _transitionComplete(element, active, isTransitioning, callback) {

      if (active) {

        const tab = $(active).hasClass('tab__link-wrap')
        const toggle = $(active).hasClass('dropdown__toggle')

        if (tab) {
          $(active).removeClass(ClassName.TAB_ACTIVE)
          $(active).parents('.tab__links').find(Selector.DROPDOWN_TOGGLE_ACTIVE).removeClass(ClassName.DROPDOWN_TOGGLE_ACTIVE)
        } else if (toggle) {
          $(active).parents('.tab__links').find(Selector.TAB_ACTIVE).removeClass(ClassName.TAB_ACTIVE)
        } else {
          $(active).removeClass(ClassName.CONTENT_ACTIVE)
        }

        const dropdownChild = $(active.parentNode).find(
          Selector.DROPDOWN_ACTIVE_CHILD
        )[0]

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName.DROPDOWN_CHILD_ACTIVE)
        }

        active.setAttribute('aria-expanded', false)
      }

      const tab = $(element).hasClass('tab__link')
      const dropdown = $(element).hasClass('dropdown__item')
      // else if (dropdown) {
      //   $(element).addClass(ClassName.DROPDOWN_MENU_ACTIVE)
      // }
      if (tab) {
        $(element).parent().addClass(ClassName.TAB_ACTIVE)
      } else if (!dropdown) {
        $(element).addClass(ClassName.CONTENT_ACTIVE)
      }

      element.setAttribute('aria-expanded', true)

      if (isTransitioning) {
        Util.reflow(element)
        $(element).addClass(ClassName.SHOW)
      } else {
        $(element).removeClass(ClassName.FADE)
      }

      if (element.parentNode &&
          $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
        const dropdownElement = $(element).closest(Selector.DROPDOWN)[0]
        if (dropdownElement) {
          $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.DROPDOWN_TOGGLE_ACTIVE)
        }

        element.setAttribute('aria-expanded', true)
      }

      if (callback) {
        callback()
      }
    }

    _addHash(element) {
      const target = $(element).attr('href') || $(element).data('target')
      const win = window
      const windowLocation = win.location
      const windowHistory = win.history
      const windowHash = windowLocation.hash

      if (target && history && history.pushState && history.replaceState) {
        const stateObject = {
          url: target
        }

        if (windowHash && stateObject.url !== windowHash) {
          windowHistory.pushState(stateObject, document.title, win.location.pathname + target)
        } else {
          windowHistory.replaceState(stateObject, document.title, win.location.pathname + target)
        }
      }

    }


    // static

    static _jQueryInterface(config) {
      return this.each(function () {
        const $this = $(this)
        let data    = $this.data(DATA_KEY)

        if (!data) {
          data = new Tab(this)
          $this.data(DATA_KEY, data)
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error(`No method named "${config}"`)
          }
          data[config]()
        }
      })
    }

  }


  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document)
    .on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault()
      Tab._jQueryInterface.call($(this), 'show')
    })


  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME]             = Tab._jQueryInterface
  $.fn[NAME].Constructor = Tab
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Tab._jQueryInterface
  }

  return Tab

})(jQuery)

export default Tab
