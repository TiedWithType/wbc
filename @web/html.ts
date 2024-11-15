export const html = (stringLiteral, ...rest) => {
 const template = document.createElement('template');

 template.innerHTML = stringLiteral.reduce((acc, next, index) => {
  let value = rest[index];

  if (Array.isArray(value)) {
   value = value.join('');
  } else if (typeof value === 'object') {
   value = JSON.stringify(value);
  }

  return acc + next + (value !== undefined ? value : '');
 }, '');

 return template.content.cloneNode(true);
};
