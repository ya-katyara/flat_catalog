export const numberFormat = (value) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);

export const sortByPrice = ( a, b ) => {
  if ( a.price.value < b.price.value ){
    return -1;
  }
  if ( a.price.value > b.price.value ){
    return 1;
  }
  return 0;
}

export const num2str = (n, text_forms) => {  
  n = Math.abs(n) % 100; var n1 = n % 10;
  if (n > 10 && n < 20) { return text_forms[2]; }
  if (n1 > 1 && n1 < 5) { return text_forms[1]; }
  if (n1 === 1) { return text_forms[0]; }
  return text_forms[2];
}