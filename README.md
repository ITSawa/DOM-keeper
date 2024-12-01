# DOM Keeper

**DOM Keeper** is a library for convenient manipulation of HTML elements in JavaScript. It provides functions for creating elements, adding and removing classes, working with attributes and styles, and managing element data.

## Installation

```bash
npm install dom-keeper
Main Functions
1. createElement(parent, options)
Creates an HTML element and appends it to the parent element.

Parameters:

parent: The parent element (HTMLElement).
options: An object containing options for the new element.
Example:

javascript

createElement(document.body, {
  htmlElement: 'div',
  classString: 'my-class',
  index: 1,
  dataSourcesString: 'source:abc',
});
2. checkHtmlElement(htmlElement)
Checks if the passed element is a valid HTML element.

Example:

javascript

checkHtmlElement('div'); // Returns 'div'
checkHtmlElement('invalid'); // Throws an error
3. bindTextToElement(element, variableName, variable)
Binds a text value to an element, updating it when the variable changes.

Example:

javascript

const reactiveVar = bindTextToElement(element, 'name', 'John');
reactiveVar.name = 'Mike'; // The element updates automatically
4. setStyle(element, property, value)
Sets a style for an element.

Example:

javascript

setStyle(element, 'color', 'red');
5. toggleClass(element, className)
Toggles a class on an element.

Example:

javascript

toggleClass(element, 'active');
Usage Example
javascript

import { createElement, setStyle, toggleClass } from 'dom-keeper';

// Create an element and append it to body
const div = createElement(document.body, {
  htmlElement: 'div',
  classString: 'my-class',
  index: 1,
  dataSourcesString: 'source:abc',
});

// Set style
setStyle(div, 'background-color', 'blue');

// Toggle class
toggleClass(div, 'highlight');
Important Notes
All library functions work only with valid HTML elements.
Using checkHtmlElement helps avoid errors when creating elements.
License
MIT
```
