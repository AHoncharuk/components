## Examples
Wrap the dropdown's toggle (your button or link) and the dropdown menu within `.dropdown`, or another element that declares `position: relative;`. Dropdowns can be triggered from `<a>` or `<button>` elements to better fit your potential needs.

### Markup
mixin dropdown()
  +b(class='dropdown')&attributes(attributes)
    +e('button')(type='button' class='toggle dropdown__toggle--btn' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false')
      | Dropdown button
    +e('div')(class='menu' aria-labelledby='')
      +e('h4')(class='header') Header
      +e('a')(href='#' class='item') Item 1
      +e('a')(href='#' class='item dropdown__item--disabled') Item 2
      +e('div')(class='divider')
      +e('a')(href='#' class='item') Item 3

## Dropup variation
Trigger dropdown menus above elements by adding `.dropdown--up` to the parent element.

## Menu alignment
By default, a dropdown menu is automatically positioned 100% from the top and along the left side of its parent. Add `.dropdown--right` to a `.dropdown__menu` to right align the dropdown menu.

## Menu headers
Add a header to label sections of actions in any dropdown menu.

## Menu dividers
Separate groups of related menu items with a divider.

## Disabled menu items
Add `.disabled` to items in the dropdown to **style them as disabled**.

## Usage
Via data attributes or JavaScript, the dropdown plugin toggles hidden content (dropdown menus) by toggling the `.show` class on the parent list item.

On mobile devices, opening a dropdown adds a `.dropdown__backdrop` as a tap area for closing dropdown menus when tapping outside the menu, a requirement for proper iOS support. **This means that switching from an open dropdown menu to a different dropdown menu requires an extra tap on mobile.**

Note: The `data-toggle="dropdown"` attribute is relied on for closing dropdown menus at an application level, so it's a good idea to always use it.

### Via data attributes
Add `data-toggle="dropdown"` to a link or button to toggle a dropdown.

### Via JavaScript
Call the dropdowns via JavaScript:
$('.dropdown-toggle').dropdown()

### Methods
| Method | Description |
| --- | --- |
| `$().dropdown('toggle')` | Toggles the dropdown menu of a given navbar or tabbed navigation. |

### Events
All dropdown events are fired at the `.dropdown-menu`'s parent element and have a `relatedTarget` property, whose value is the toggling anchor element.

| Event | Description |
| --- | --- |
| `show.bs.dropdown` | This event fires immediately when the show instance method is called. |
| `shown.bs.dropdown` | This event is fired when the dropdown has been made visible to the user (will wait for CSS transitions, to complete). |
| `hide.bs.dropdown` | This event is fired immediately when the hide instance method has been called. |
| `hidden.bs.dropdown`| This event is fired when the dropdown has finished being hidden from the user (will wait for CSS transitions, to complete). |
