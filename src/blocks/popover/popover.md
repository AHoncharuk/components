## Overview

Things to know when using the popover plugin:


- Popovers rely on the 3rd party library [Tether](http://tether.io/) for positioning. You must include [tether.min.js](https://github.com/HubSpot/tether/blob/master/dist/js/tether.min.js) before bootstrap.js in order for popovers to work!
- Popovers require the [tooltip plugin]({{ site.baseurl }}/components/tooltips/) as a dependency.
- Popovers are opt-in for performance reasons, so **you must initialize them yourself**.
- Zero-length `title` and `content` values will never show a popover.
- Specify `container: 'body'` to avoid rendering problems in more complex components (like our input groups, button groups, etc).
- Triggering popovers on hidden elements will not work.
- Popovers for `.disabled` or `disabled` elements must be triggered on a wrapper element.
- When triggered from hyperlinks that span multiple lines, popovers will be centered. Use `white-space: nowrap;` on your `<a>`s to avoid this behavior.


## Example: Enable popovers everywhere
One way to initialize all popovers on a page would be to select them by their `data-toggle` attribute:

$('[data-toggle="popover"]').popover()

## Example: Using the `container` option
When you have some styles on a parent element that interfere with a popover, you'll want to specify a custom `container` so that the popover's HTML appears within that element instead.

$('.example-popover').popover({
  container: 'body'
})

## Popover template (right position)

<div class="popover popover--right">
  <h3 class="popover__title">Popover right</h3>
  <div class="popover__content">
    <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
  </div>
</div>

### Dismiss on next click
Use the `focus` trigger to dismiss popovers on the next click that the user makes.

<a tabindex="0" class="btn btn-lg btn-danger" role="button" data-toggle="popover" data-trigger="focus" title="Dismissible popover" data-content="And here's some amazing content. It's very engaging. Right?">Dismissible popover</a>

$('.popover-dismiss').popover({
  trigger: 'focus'
})

### Options

Options can be passed via data attributes or JavaScript. For data attributes, append the option name to `data-`, as in `data-animation=""`.

<table class="table table-bordered table-striped table-responsive">
  <thead>
    <tr>
      <th style="width: 100px;">Name</th>
      <th style="width: 100px;">Type</th>
      <th style="width: 50px;">Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>animation</td>
      <td>boolean</td>
      <td>true</td>
      <td>Apply a CSS fade transition to the popover</td>
    </tr>
    <tr>
      <td>container</td>
      <td>string | false</td>
      <td>false</td>
      <td>
        <p>Appends the popover to a specific element. Example: <code>container: 'body'</code>. This option is particularly useful in that it allows you to position the popover in the flow of the document near the triggering element - which will prevent the popover from floating away from the triggering element during a window resize.</p>
      </td>
    </tr>
    <tr>
      <td>content</td>
      <td>string | element | function</td>
      <td>''</td>
      <td>
        <p>Default content value if <code>data-content</code> attribute isn't present.</p>
        <p>If a function is given, it will be called with its <code>this</code> reference set to the element that the popover is attached to.</p>
      </td>
    </tr>
    <tr>
      <td>delay</td>
      <td>number | object</td>
      <td>0</td>
      <td>
       <p>Delay showing and hiding the popover (ms) - does not apply to manual trigger type</p>
       <p>If a number is supplied, delay is applied to both hide/show</p>
       <p>Object structure is: <code>delay: { "show": 500, "hide": 100 }</code></p>
      </td>
    </tr>
    <tr>
      <td>html</td>
      <td>boolean</td>
      <td>false</td>
      <td>Insert HTML into the popover. If false, jQuery's <code>text</code> method will be used to insert content into the DOM. Use text if you're worried about XSS attacks.</td>
    </tr>
    <tr>
      <td>placement</td>
      <td>string | function</td>
      <td>'right'</td>
      <td>
        <p>How to position the popover - top | bottom | left | right.</p>
        <p>When a function is used to determine the placement, it is called with the popover DOM node as its first argument and the triggering element DOM node as its second. The <code>this</code> context is set to the popover instance.</p>
      </td>
    </tr>
    <tr>
      <td>selector</td>
      <td>string</td>
      <td>false</td>
      <td>If a selector is provided, popover objects will be delegated to the specified targets. In practice, this is used to enable dynamic HTML content to have popovers added. See <a href="https://github.com/twbs/bootstrap/issues/4215">this</a> and <a href="https://jsbin.com/zopod/1/edit">an informative example</a>.</td>
    </tr>
    <tr>
      <td>template</td>
      <td>string</td>
      <td><code>'&lt;div class="popover" role="tooltip"&gt;&lt;div class="popover-arrow"&gt;&lt;/div&gt;&lt;h3 class="popover-title"&gt;&lt;/h3&gt;&lt;div class="popover-content"&gt;&lt;/div&gt;&lt;/div&gt;'</code></td>
      <td>
        <p>Base HTML to use when creating the popover.</p>
        <p>The popover's <code>title</code> will be injected into the <code>.popover-title</code>.</p>
        <p>The popover's <code>content</code> will be injected into the <code>.popover-content</code>.</p>
        <p><code>.popover-arrow</code> will become the popover's arrow.</p>
        <p>The outermost wrapper element should have the <code>.popover</code> class.</p>
      </td>
    </tr>
    <tr>
      <td>title</td>
      <td>string | element | function</td>
      <td>''</td>
      <td>
        <p>Default title value if <code>title</code> attribute isn't present.</p>
        <p>If a function is given, it will be called with its <code>this</code> reference set to the element that the popover is attached to.</p>
      </td>
    </tr>
    <tr>
      <td>trigger</td>
      <td>string</td>
      <td>'click'</td>
      <td>How popover is triggered - click | hover | focus | manual. You may pass multiple triggers; separate them with a space. `manual` cannot be combined with any other trigger.</td>
    </tr>
    <tr>
      <td>constraints</td>
      <td>Array</td>
      <td>'hover focus'</td>
      <td>An array of constraints - passed through to Tether. For more information refer to Tether's <a href="http://tether.io/#constraints">constraint docs</a>.</td>
    </tr>
    <tr>
      <td>offset</td>
      <td>string</td>
      <td>'0 0'</td>
      <td>Offset of the popover relative to its target. For more information refer to Tether's <a href="http://tether.io/#offset">offset docs</a>.</td>
    </tr>
  </tbody>
</table>


#### Data attributes for individual popovers
Options for individual popovers can alternatively be specified through the use of data attributes, as explained above.

### Methods

#### `$().popover(options)`

Initializes popovers for an element collection.

#### `.popover('show')`

Reveals an element's popover. **Returns to the caller before the popover has actually been shown** (i.e. before the `shown.bs.popover` event occurs). This is considered a "manual" triggering of the popover. Popovers whose both title and content are zero-length are never displayed.

#### `.popover('hide')`

Hides an element's popover. **Returns to the caller before the popover has actually been hidden** (i.e. before the `hidden.bs.popover` event occurs). This is considered a "manual" triggering of the popover.

#### `.popover('toggle')`

Toggles an element's popover. **Returns to the caller before the popover has actually been shown or hidden** (i.e. before the `shown.bs.popover` or `hidden.bs.popover` event occurs). This is considered a "manual" triggering of the popover.

#### `.popover('dispose')`

Hides and destroys an element's popover. Popovers that use delegation (which are created using [the `selector` option](#options)) cannot be individually destroyed on descendant trigger elements.

### Events

<table class="table table-bordered table-striped table-responsive">
  <thead>
   <tr>
      <th style="width: 150px;">Event Type</th>
      <th>Description</th>
   </tr>
  </thead>
  <tbody>
    <tr>
      <td>show.bs.popover</td>
      <td>This event fires immediately when the <code>show</code> instance method is called.</td>
    </tr>
    <tr>
      <td>shown.bs.popover</td>
      <td>This event is fired when the popover has been made visible to the user (will wait for CSS transitions to complete).</td>
    </tr>
    <tr>
      <td>hide.bs.popover</td>
      <td>This event is fired immediately when the <code>hide</code> instance method has been called.</td>
    </tr>
    <tr>
      <td>hidden.bs.popover</td>
      <td>This event is fired when the popover has finished being hidden from the user (will wait for CSS transitions to complete).</td>
    </tr>
  </tbody>
</table>
