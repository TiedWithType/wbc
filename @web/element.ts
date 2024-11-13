import { css } from "./css";
import { html } from "./html";

export class WebElement extends HTMLElement {
 constructor() {
  super();
 }

 styles() {
  return css`
   :host { display: inline-block }
  `;
 }

 render() {
  return html`<slot>default_content</slot>`;
 }

 connectedCallback() {
  this.attachShadow({ mode: "open" });
  this.shadowRoot.appendChild(this.styles());
  this.shadowRoot.appendChild(this.render());
 }

  attributeChangedCallback(attr, prev, next) {
   if (prev !== next) {
    Reflect.set(this, attr, next)
   }
  }

 static get observedAttributes() {
  const proto = Reflect.getPrototypeOf(this);
  
  return proto.observables ?? [];
 }
}