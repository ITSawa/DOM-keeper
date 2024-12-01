import {
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
} from "../lib/script.js"; // adjust the import path as needed

describe("HTML Manipulation Functions", () => {
  let parentElement;

  beforeEach(() => {
    // Set up before each test
    parentElement = document.createElement("div");
    document.body.appendChild(parentElement);
  });

  afterEach(() => {
    // Clean up after each test
    document.body.innerHTML = "";
  });

  test("checkHtmlElement - valid element", () => {
    expect(checkHtmlElement("div")).toBe("div");
  });

  test("checkHtmlElement - invalid element", () => {
    expect(() => checkHtmlElement("invalid")).toThrow(
      "Error: 'invalid' is not a valid HTML element."
    );
  });

  test("createElement - creates element and appends it", () => {
    const element = createElement(parentElement, { htmlElement: "div" });
    expect(element.tagName).toBe("DIV");
    expect(parentElement.contains(element)).toBe(true);
  });

  test("createElement - adds classes and sets index and dataSources", () => {
    const element = createElement(parentElement, {
      htmlElement: "span",
      classString: "class1 class2",
      index: 5,
      dataSourcesString: "data1:value1 data2:value2",
    });
    expect(element.classList.contains("class1")).toBe(true);
    expect(element.classList.contains("class2")).toBe(true);
    expect(element.dataset.index).toBe("5");
    expect(element.dataset.data1).toBe("value1");
    expect(element.dataset.data2).toBe("value2");
  });

  test("addElement - appends child to parent", () => {
    const child = document.createElement("p");
    addElement(parentElement, child);
    expect(parentElement.contains(child)).toBe(true);
  });

  test("removeElement - removes child from parent", () => {
    const child = document.createElement("p");
    addElement(parentElement, child);
    removeElement(parentElement, child);
    expect(parentElement.contains(child)).toBe(false);
  });

  test("findById - finds element by id", () => {
    const element = document.createElement("div");
    element.id = "testId";
    document.body.appendChild(element);
    expect(findById("testId")).toBe(element);
  });

  test("findByClass - finds elements by class name", () => {
    const element1 = document.createElement("div");
    element1.className = "testClass";
    const element2 = document.createElement("div");
    element2.className = "testClass";
    document.body.appendChild(element1);
    document.body.appendChild(element2);
    expect(findByClass("testClass").length).toBe(2);
  });

  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("findByTag - finds elements by tag name", () => {
    const element1 = document.createElement("div");
    const element2 = document.createElement("div");
    document.body.appendChild(element1);
    document.body.appendChild(element2);
    expect(findByTag("div").length).toBe(2);
  });

  test("findBySelector - finds element by selector", () => {
    const element = document.createElement("div");
    element.className = "testClass";
    document.body.appendChild(element);
    expect(findBySelector(".testClass")).toBe(element);
  });

  test("bindTextToElement - binds text to element", () => {
    const element = document.createElement("div");
    const reactiveVar = bindTextToElement(element, "text", "Hello");
    expect(element.textContent).toBe("Hello");
    reactiveVar.text = "World";
    expect(element.textContent).toBe("World");
  });

  test("setStyle - sets style property", () => {
    const element = document.createElement("div");
    setStyle(element, "color", "red");
    expect(element.style.color).toBe("red");
  });

  test("getStyle - gets style property", () => {
    const element = document.createElement("div");
    element.style.color = "blue";
    expect(getStyle(element, "color")).toBe("blue");
  });

  test("deleteStyle - deletes style property", () => {
    const element = document.createElement("div");
    element.style.color = "green";
    deleteStyle(element, "color");
    expect(element.style.color).toBe("");
  });

  test("toggleClass - toggles class on element", () => {
    const element = document.createElement("div");
    toggleClass(element, "active");
    expect(element.classList.contains("active")).toBe(true);
    toggleClass(element, "active");
    expect(element.classList.contains("active")).toBe(false);
  });

  test("addClasses - adds multiple classes", () => {
    const element = document.createElement("div");
    addClasses(element, ["class1", "class2"]);
    expect(element.classList.contains("class1")).toBe(true);
    expect(element.classList.contains("class2")).toBe(true);
  });

  test("removeClasses - removes multiple classes", () => {
    const element = document.createElement("div");
    element.classList.add("class1", "class2");
    removeClasses(element, ["class1", "class2"]);
    expect(element.classList.contains("class1")).toBe(false);
    expect(element.classList.contains("class2")).toBe(false);
  });
});
