import { WebComponent } from "../@web/component";
import { WebElement } from "../@web/element";
import { css } from "../@web/css";
import { html } from "../@web/html";

@WebComponent("app-root")
export class AppRoot extends WebElement {
 styles() { return css`
  :is(.list:has(.item)) {
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   gap: var(--md);
  }
  
  :is(.item) {
   display: grid;
   place-items: center;
   font-size: 1rem;
   background: var(--bgColor);
   inline-size: 6.25rem;
   block-size: 6.25rem;
   border-radius: var(--md);
  }
  
  :is(span) {
   text-align: center;
   color:
   color-mix(in srgb, var(--bgColor) 30%, white 70%);
  }
  
 `}
 
 render() {
  return html`
  <div class="list">
   ${this.list.map(({color, name}) => {
    return `
     <div class="item" style="--bgColor: ${color}">
      <span>${name}</span>
     </div>
    `
   })}
  </div>
 `}
 
 list = [{ 
  color: "var(--redViolet)",
  name: "Violet Red"
 }, {
  color: "var(--powderBlue)",
  name: "Powder Blue"
 }, {
  color: "var(--darkPrimaryColor)",
  name: "Dark Primary"
 }, {
  color: "var(--primaryColor)",
  name: "Primary"
 }, {
  color: "var(--lightPrimaryColor)",
  name: "Light Primary"
 }, {
  color: "var(--accentColor)",
  name: "Accent"
 }]
}