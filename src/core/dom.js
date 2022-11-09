/**
 * Create an HTMLElement from the HTML template.
 * @param {string} template the HTML template
 * @returns {HTMLElement} the created HTMLElement
 */
export function createFromTemplate(template) {
  const range = document.createRange();
  range.selectNode(document.body);
  return range.createContextualFragment(template).children[0];
}

/**
 * Check if the node has the given attribute.
 * @param {HTMLElement} node
 * @param {string} attribute
 * @returns {boolean} true or false
 */
export function hasAttribute(node, attribute) {
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  return node.hasAttribute(attribute);
}

/**
 * Get the given attribute.
 * @param {HTMLElement} node
 * @param {string} attribute
 * @returns {string|null} the value
 */
export function getAttribute(node, attribute) {
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  return node.getAttribute(attribute);
}

/**
 * Set the given attribute.
 * If the value is `null` the attribute will be removed.
 * @param {HTMLElement} node
 * @param {string} attribute
 * @param {string|null} value
 * @returns {HTMLElement} the element
 */
export function setAttribute(node, attribute, value) {
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return node;
  }

  if (value === null) {
    node.removeAttribute(attribute);
  } else {
    node.setAttribute(attribute, value);
  }

  return node;
}
