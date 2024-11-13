export const css = stringLiteral => {
 const style = document.createElement("style");
 style.textContent = stringLiteral;
 
 return style;
}