export const SalePrices = [
  "£100,000",
  "£200,000",
  "£300,000",
  "£400,000",
  "£500,000",
  "£600,000",
  "£700,000",
  "£800,000",
  "£900,000",
  "£1,000,000",
  "£2,000,000",
  "£3,000,000",
  "£4,000,000",
  "£5,000,000",
  "£10,000,000",
  "£15,000,000",
];

export const RentPrices = [
  "£500pm",
  "£1,000pm",
  "£2,000pm",
  "£3,000pm",
  "£4,000pm",
  "£5,000pm",
  "£6,000pm",
  "£7,000pm",
  "£8,000pm",
  "£9,000pm",
  "£10,000pm",
  "£15,000pm",
  "£20,000pm",
  "£25,000pm",
];

export function getPrice(price) {
  return parseInt(price.replaceAll(/£|,|pm/ig, ''));
}