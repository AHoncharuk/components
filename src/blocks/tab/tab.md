## Example: Markup

mixin tab()
  +b(class='tab')&attributes(attributes)
    +e('ul')(class='links')(role='tablist')
      +e('li')(class='link-wrap tab__link-wrap--active' role='presentation')
        +e('a')(class='link' href='#tab1', aria-controls='tab1', role='tab', data-toggle='tab') Home
      +e('li')(class='link-wrap' role='presentation')
        +e('a')(class='link' href='#tab2', aria-controls='tab2', role='tab', data-toggle='tab') Profile
      +e('li')(class='link-wrap' role='presentation')
        +e('a')(class='link' href='#tab3', aria-controls='tab3', role='tab', data-toggle='tab') Messages
    +e(class='content-wrapper')
      +e(class='content-item tab__content-item--active' id='tab1' role='tabpanel') Content 1
      +e(class='content-item' id='tab2' role='tabpanel') Content 2
      +e(class='content-item' id='tab3' role='tabpanel') Content 3
