import { WebComponent } from "../@web/component";
import { WebElement } from "../@web/element";
import { css } from "../@web/css";
import { html } from "../@web/html";

@WebComponent("app-root")
export class AppRoot extends WebElement {
 styles() { return css`
  :is(.list:has(.item)) {
   display: flex;
   flex-wrap: wrap;
   place-content: center;
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
  
  :is(.text) {
   text-align: center;
   inline-size: min-content;
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
      <span class="text">${name}</span>
     </div>
    `
   })}
  </div>
 `}
 
 list = [
 { color: "var(--redViolet)", name: "Violet Red" },
 { color: "var(--powderBlue)", name: "Powder Blue" },
 {
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
 }, { color: "#ff7043", name: "Deep Orange" },
  { color: "#cddc39", name: "Lime Green" },
  { color: "#00bcd4", name: "Cyan" },
  { color: "#a0a0a0", name: "Warm Gray" },
  { color: "#1e88e5", name: "Cool Blue" },
  { color: "#388e3c", name: "Forest Green" },
  { color: "#ffd700", name: "Gold" },
  { color: "#e57373", name: "Light Red" },
  { color: "#81c784", name: "Soft Green" },
  { color: "#64b5f6", name: "Sky Blue" },
  { color: "#ffd54f", name: "Sunflower" },
  { color: "#4dd0e1", name: "Bright Cyan" }]
}