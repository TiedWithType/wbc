export const WebComponent = selector => target => {
 customElements.get(selector) ?? customElements.define(selector, target);
};
