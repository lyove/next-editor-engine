/**
 * Creates HTML element in editor document
 *
 * @param {string} name
 * @param {Object.<string, string>} [attributes = {}]
 * @param {string} [html = '']
 * @return {HTMLElement}
 */
const createElement = (name, { attributes = {}, html = "" } = {}) => {
  const element = window.document.createElement(name);
  element.innerHTML = html;
  Object.entries(attributes).forEach(([key, val]) => val && element.setAttribute(key, `${val}`));
  return element;
};

export { createElement };
