/**
 * @type {Record<string, string>}
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element
 */
const validHtmlElements = {
  a: "a",
  abbr: "abbr",
  address: "address",
  area: "area",
  article: "article",
  aside: "aside",
  audio: "audio",
  b: "b",
  bdi: "bdi",
  bdo: "bdo",
  blockquote: "blockquote",
  body: "body",
  button: "button",
  canvas: "canvas",
  caption: "caption",
  cite: "cite",
  code: "code",
  col: "col",
  colgroup: "colgroup",
  data: "data",
  datalist: "datalist",
  dd: "dd",
  del: "del",
  details: "details",
  dfn: "dfn",
  dialog: "dialog",
  div: "div",
  dl: "dl",
  dt: "dt",
  em: "em",
  embed: "embed",
  fieldset: "fieldset",
  figcaption: "figcaption",
  figure: "figure",
  footer: "footer",
  form: "form",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  header: "header",
  hr: "hr",
  html: "html",
  i: "i",
  iframe: "iframe",
  img: "img",
  input: "input",
  ins: "ins",
  kbd: "kbd",
  label: "label",
  legend: "legend",
  li: "li",
  link: "link",
  main: "main",
  map: "map",
  mark: "mark",
  menu: "menu",
  meta: "meta",
  meter: "meter",
  nav: "nav",
  noscript: "noscript",
  object: "object",
  ol: "ol",
  optgroup: "optgroup",
  option: "option",
  output: "output",
  p: "p",
  picture: "picture",
  pre: "pre",
  progress: "progress",
  q: "q",
  rp: "rp",
  rt: "rt",
  ruby: "ruby",
  s: "s",
  samp: "samp",
  script: "script",
  section: "section",
  select: "select",
  slot: "slot",
  small: "small",
  source: "source",
  span: "span",
  strong: "strong",
  style: "style",
  sub: "sub",
  summary: "summary",
  sup: "sup",
  table: "table",
  tbody: "tbody",
  td: "td",
  template: "template",
  textarea: "textarea",
  tfoot: "tfoot",
  th: "th",
  thead: "thead",
  time: "time",
  title: "title",
  tr: "tr",
  track: "track",
  u: "u",
  ul: "ul",
  var: "var",
  video: "video",
  wbr: "wbr",
};

/**
 * @param {HTMLElement} element
 * @param {string} classString
 */
function checkClasses(element, classString) {
  if (classString) {
    const classes = classString.split(" ").filter(Boolean);
    element.classList.add(...classes);
  }
}

/**
 * @param {HTMLElement} element
 * @param {number|string} index
 */
function checkIndex(element, index) {
  if (index) {
    element.dataset.index = String(index);
  }
}

/**
 * @param {HTMLElement} element
 * @param {string} dataSourcesString
 */
function checkDataSources(element, dataSourcesString) {
  if (dataSourcesString) {
    const dataSources = dataSourcesString.split(" ").filter(Boolean);
    dataSources.forEach((dataSource) => {
      const [key, value] = dataSource.split(":");
      if (key && value) {
        element.dataset[key] = value;
      }
    });
  }
}

/**
 * Validates if the provided HTML element is valid.
 * @param {string} htmlElement
 * @returns {string}
 */
function checkHtmlElement(htmlElement) {
  if (!validHtmlElements[htmlElement]) {
    throw new Error(
      `Error: '${htmlElement}' is not a valid HTML element. Valid elements are: ${Object.keys(
        validHtmlElements
      ).join(", ")}`
    );
  }
  return validHtmlElements[htmlElement];
}

/**
 * Creates an HTML element and appends it to the specified parent.
 * @param {HTMLElement} parent
 * @param {Object} options
 * @returns {HTMLElement}
 */
function createElement(
  parent,
  {
    htmlElement,
    classString,
    index,
    dataSourcesString,
    attributes = {},
    eventListeners = {},
    ...rest
  }
) {
  const element = document.createElement(checkHtmlElement(htmlElement));
  checkClasses(element, classString);
  checkIndex(element, index);
  checkDataSources(element, dataSourcesString);

  // Set attributes
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  // Add custom properties
  Object.entries(rest).forEach(([key, value]) => {
    element[key] = value;
  });

  // Add event listeners
  Object.entries(eventListeners).forEach(([event, handler]) => {
    element.addEventListener(event, handler);
  });

  parent.appendChild(element);
  return element;
}

/**
 * Appends a child element to the parent.
 * @param {HTMLElement} parent
 * @param {HTMLElement} child
 */
function addElement(parent, child) {
  parent.appendChild(child);
}

/**
 * Removes a child element from the parent.
 * @param {HTMLElement} parent
 * @param {HTMLElement} child
 */
function removeElement(parent, child) {
  parent.removeChild(child);
}

/**
 * Finds an element by its ID.
 * @param {string} id
 * @returns {HTMLElement|null}
 */
function findById(id) {
  return document.getElementById(id);
}

/**
 * Finds elements by their class name.
 * @param {string} className
 * @returns {HTMLCollectionOf<Element>}
 */
function findByClass(className) {
  return document.getElementsByClassName(className);
}

/**
 * Finds all elements by their class name.
 * @param {string} className
 * @returns {NodeListOf<Element>}
 */
function findAllByClass(className) {
  return document.querySelectorAll(`.${className}`);
}

/**
 * Finds elements by their tag name.
 * @param {string} tagName
 * @returns {HTMLCollectionOf<Element>}
 */
function findByTag(tagName) {
  return document.querySelectorAll(tagName);
}

/**
 * Finds the first element that matches the provided selector.
 * @param {string} selector
 * @returns {HTMLElement|null}
 */
function findBySelector(selector) {
  return document.querySelector(selector);
}

/**
 * Finds all elements that match the provided selector.
 * @param {string} selector
 * @returns {NodeListOf<Element>}
 */
function findAllBySelector(selector) {
  return document.querySelectorAll(selector);
}

/**
 * Function to track changes to a variable and update the text in an HTML element.
 * @param {HTMLElement} element - The HTML element whose text needs to be updated.
 * @param {string} variableName - The name of the variable to be tracked.
 * @param {any} variable - The variable whose value will be inserted into the element.
 */
function bindTextToElement(element, variableName, variable) {
  element.textContent = variable;

  const handler = {
    set(target, property, value) {
      if (property === variableName) {
        element.textContent = value;
      }
      target[property] = value;
      return true;
    },
  };

  const reactiveVariable = new Proxy({ [variableName]: variable }, handler);

  return reactiveVariable;
}

/**
 * Sets a style property of an HTML element.
 * @param {HTMLElement} element
 * @param {string} property
 * @param {string} value
 */
function setStyle(element, property, value) {
  if (element && property && value) {
    element.style[property] = value;
  }
}

/**
 * Gets a style property of an HTML element.
 * @param {HTMLElement} element
 * @param {string} property
 * @returns {string}
 */
function getStyle(element, property) {
  if (element && property) {
    return window.getComputedStyle(element)[property];
  }
  return "";
}

/**
 * Deletes a style property of an HTML element.
 * @param {HTMLElement} element
 * @param {string} property
 */
function deleteStyle(element, property) {
  if (element && property) {
    element.style[property] = "";
  }
}

/**
 * Toggles a class on an HTML element.
 * @param {HTMLElement} element
 * @param {string} className
 */
function toggleClass(element, className) {
  if (element && className) {
    element.classList.toggle(className);
  }
}

/**
 * Adds multiple classes to an HTML element.
 * @param {HTMLElement} element
 * @param {string[]} classNames
 */
function addClasses(element, classNames) {
  if (element && classNames) {
    element.classList.add(...classNames);
  }
}

/**
 * Removes multiple classes from an HTML element.
 * @param {HTMLElement} element
 * @param {string[]} classNames
 */
function removeClasses(element, classNames) {
  if (element && classNames) {
    element.classList.remove(...classNames);
  }
}

export {
  createElement,
  addElement,
  removeElement,
  findById,
  findByClass,
  findAllByClass,
  findByTag,
  findBySelector,
  findAllBySelector,
  bindTextToElement,
  setStyle,
  getStyle,
  deleteStyle,
  toggleClass,
  addClasses,
  removeClasses,
  checkHtmlElement,
};
