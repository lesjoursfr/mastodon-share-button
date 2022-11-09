/**
 * Sources :
 * - https://github.com/lukechilds/browser-env/blob/master/src/index.js (browserEnv function)
 * - https://github.com/lukechilds/window/blob/master/src/index.js (Window class)
 */
import { JSDOM, ResourceLoader } from "jsdom";

// Class to return a window instance.
// Accepts a jsdom config object.
class Window {
  constructor(jsdomConfig = {}) {
    const { proxy, strictSSL, userAgent } = jsdomConfig;
    const resources = new ResourceLoader({
      proxy,
      strictSSL,
      userAgent,
    });
    return new JSDOM(
      "",
      Object.assign(jsdomConfig, {
        resources,
      })
    ).window;
  }
}

// Default jsdom config.
// These settings must override any custom settings to make sure we can iterate
// over the window object.
const defaultJsdomConfig = {
  features: {
    FetchExternalResources: false,
    ProcessExternalResources: false,
  },
};

// IIFE executed on import to return an array of global Node.js properties that
// conflict with global browser properties.
const protectedproperties = (() =>
  Object.getOwnPropertyNames(new Window(defaultJsdomConfig)).filter((prop) => typeof global[prop] !== "undefined"))();
protectedproperties.push("undefined");

// Sets up global browser environment
const browserEnv = function () {
  // Extract options from args
  const args = Array.from(arguments);
  const properties = args.filter((arg) => Array.isArray(arg))[0];
  const userJsdomConfig = args.filter((arg) => !Array.isArray(arg))[0] || {};

  // Create window object
  const window = new Window(Object.assign({}, userJsdomConfig, defaultJsdomConfig));

  // Get all global browser properties
  Object.getOwnPropertyNames(window)
    // Remove protected properties
    .filter((prop) => protectedproperties.indexOf(prop) === -1)
    // If we're only applying specific required properties remove everything else
    .filter((prop) => !(properties && properties.indexOf(prop) === -1))
    // Copy what's left to the Node.js global scope
    .forEach((prop) => {
      Object.defineProperty(global, prop, {
        configurable: true,
        get: () => window[prop],
      });
    });

  // Return reference to original window object
  return window;
};

// Call the browserEnv function
browserEnv();
