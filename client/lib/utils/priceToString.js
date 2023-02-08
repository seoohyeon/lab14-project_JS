export function changePriceToString(price) {
  let priceStr = String(price);

  priceStr = `${priceStr.slice(0,-3)}${priceStr.slice(0,-3).length>0?
  `,`:``}${priceStr.slice(-3)}원`;

  return priceStr;
}

export function changeStringToPrice(str) {
  str = Number.parseInt(str.replace(/[^0-9]/g, ""));
  return str
}