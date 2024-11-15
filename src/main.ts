import { WebComponent } from '../@web/component';
import { WebElement } from '../@web/element';
import { css } from '../@web/css';
import { html } from '../@web/html';
import colors from './colors.json';

@WebComponent('app-root')
export class AppRoot extends WebElement {
 styles() {
  return css`
   :is(.list:has(.item)) {
    display: flex;
    flex-wrap: wrap;
    place-content: center;
    gap: var(--md);
   }

   :is(.item) {
    display: flex;
    place-content: center;
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
    color: color-mix(in srgb, var(--bgColor) 30%, white 70%);
   }
  `;
 }

 copyColor(color) {
  navigator.clipboard
   .writeText(color)
   .then(() => {
    console.log(`Kolor ${color} został skopiowany do schowka!`);
   })
   .catch(err => {
    console.error('Błąd podczas kopiowania do schowka:', err);
   });
 }

 render() {
  return html`
   <div class="list">
    ${colors
     .map(({ color, name }) => {
      return `
     <div @click="copyColor('${color}')" class="item" style="--bgColor: ${color}">
      <span class="text">${name}</span>
     </div>
    `;
     })
     .join('')}
   </div>
  `;
 }
}
