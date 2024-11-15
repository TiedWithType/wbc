import { css } from './css';
import { html } from './html';

export class WebElement extends HTMLElement {
 constructor() {
  super();
 }

 styles() {
  return css`
   :host {
    display: inline-block;
   }
  `;
 }

 render() {
  return html`<slot>default_content</slot>`;
 }

 eventsResolver() {
  const all = Array.from(this.shadowRoot.querySelectorAll('*'));

  all.forEach(elem => {
   Array.from(elem.attributes)
    .filter(attr => attr.name.startsWith('@'))
    .forEach(attr => {
     const eventName = attr.name.slice(1); // Nazwa zdarzenia (np. "click")
     const expression = attr.value.trim(); // Wyrażenie (np. "event(args)")

     const match = expression.match(/^(\w+)\((.*)\)$/); // Dopasowanie "event(args)"
     if (match) {
      const [_, methodName, argsString] = match;
      const handler = this[methodName]?.bind(this);

      if (typeof handler === 'function') {
       elem.addEventListener(eventName, event => {
        const args = argsString
         .split(',')
         .map(arg => arg.trim()) // Dzielimy i czyścimy argumenty
         .map(arg => {
          if (arg === 'event') return event; // Specjalna obsługa `event`
          if (!isNaN(arg)) return Number(arg); // Liczby
          if (/^["'].*["']$/.test(arg)) return arg.slice(1, -1); // Ciągi znaków
          return this[arg]; // Zmienna z kontekstu klasy
         });

        handler(...args);
       });
      } else {
       console.warn(
        `Handler "${methodName}" not found for event "${eventName}"`,
       );
      }
     } else {
      console.warn(`Invalid expression: "${expression}"`);
     }
    });
  });
 }

 connectedCallback() {
  this.attachShadow({ mode: 'open' });
  this.shadowRoot.appendChild(this.styles());
  this.shadowRoot.appendChild(this.render());

  this.eventsResolver();
 }

 attributeChangedCallback(attr, prev, next) {
  if (prev !== next) {
   Reflect.set(this, attr, next);
  }
 }

 static get observedAttributes() {
  const proto = Reflect.getPrototypeOf(this);

  return proto.observables ?? [];
 }
}
