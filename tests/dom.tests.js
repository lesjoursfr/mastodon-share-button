import test from "ava";
import { JSDOM } from "jsdom";
import { createFromTemplate, hasClass, hasAttribute, getAttribute, setAttribute } from "../src/core/dom.js";

test("core.dom.createFromTemplate", (t) => {
  const node1 = createFromTemplate('<span attr1="value1" attr2="value2"><b>Bold text</b></span>');
  t.is(node1.outerHTML, '<span attr1="value1" attr2="value2"><b>Bold text</b></span>');
});

test("core.dom.hasClass", (t) => {
  const dom = new JSDOM('<!DOCTYPE html><p class="bar">Hello world</p>');

  t.false(hasClass(dom.window.document.querySelector("p"), "foo"));
  t.true(hasClass(dom.window.document.querySelector("p"), "bar"));
});

test("core.dom.hasAttribute", (t) => {
  const dom = new JSDOM('<!DOCTYPE html><p foo="bar">Hello world</p>');

  t.false(hasAttribute(dom.window.document.querySelector("p"), "bar"));
  t.true(hasAttribute(dom.window.document.querySelector("p"), "foo"));
});

test("core.dom.getAttribute", (t) => {
  const dom = new JSDOM('<!DOCTYPE html><p foo="bar">Hello world</p>');

  t.is(getAttribute(dom.window.document.querySelector("p"), "bar"), null);
  t.is(getAttribute(dom.window.document.querySelector("p"), "foo"), "bar");
});

test("core.dom.setAttribute", (t) => {
  const dom = new JSDOM("<!DOCTYPE html><p>Hello world</p>");

  setAttribute(dom.window.document.querySelector("p"), "foo", "bar");
  t.is(getAttribute(dom.window.document.querySelector("p"), "foo"), "bar");
  setAttribute(dom.window.document.querySelector("p"), "foo", null);
  t.is(getAttribute(dom.window.document.querySelector("p"), "foo"), null);
});
