/* globals global:true */
/**
 * Sources :
 * - https://github.com/lukechilds/browser-env/blob/master/src/index.js (browserEnv function)
 * - https://github.com/lukechilds/window/blob/master/src/index.js (Window class)
 */
import { JSDOM } from "jsdom";

// Class to return a window instance.
// Accepts a jsdom config object.
class Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(jsdomConfig: any = {}) {
    const { userAgent } = jsdomConfig;
    return new JSDOM(
      "",
      Object.assign(jsdomConfig, {
        resources: userAgent ? { userAgent: userAgent } : undefined,
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
const forceOverrideForKeys = ["Event", "CustomEvent"]; // We need to force these overrides to use events in AVA tests
const protectedproperties: Array<string> = (() =>
  (Object.getOwnPropertyNames(new Window(defaultJsdomConfig)) as Array<keyof Window>)
    .filter((prop) => typeof global[prop] !== "undefined")
    .filter((prop) => forceOverrideForKeys.indexOf(prop) === -1))();
protectedproperties.push("undefined");

// Sets up global browser environment
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const browserEnv = function (...args: Array<any>) {
  // Extract options from args
  const properties = args.filter((arg) => Array.isArray(arg))[0];
  const userJsdomConfig = args.filter((arg) => !Array.isArray(arg))[0] || {};

  // Create window object
  const window = new Window(Object.assign({}, userJsdomConfig, defaultJsdomConfig));

  // Get all global browser properties
  (Object.getOwnPropertyNames(window) as Array<keyof Window>)
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
