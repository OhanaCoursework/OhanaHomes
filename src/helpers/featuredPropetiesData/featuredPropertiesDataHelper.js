import { buyPropertiesData } from "./buyPropertiesData";
import { rentPropertiesData } from "./rentPropertiesData";

export function getBuyMarketplaceData() {
  return buyPropertiesData;
}

export function getRentMarketplaceData() {
  return rentPropertiesData;
}

export function comparePropertiesPriceDesc(a, b) {
  let priceA = parseInt(a.price.replaceAll(",", ""));
  let priceB = parseInt(b.price.replaceAll(",", ""));

  if (priceA > priceB) {
    return -1;
  }
  if (priceA < priceB) {
    return 1;
  }
  return 0;
}

export function comparePropertiesPriceAsc(a, b) {
  let priceA = parseInt(a.price.replaceAll(",", ""));
  let priceB = parseInt(b.price.replaceAll(",", ""));

  if (priceA < priceB) {
    return -1;
  }
  if (priceA > priceB) {
    return 1;
  }
  return 0;
}

export function compareSizeAsc(a, b) {
  if (a.size > b.size) {
    return -1;
  }
  if (a.size < b.size) {
    return 1;
  }
  return 0;
}

export function compareSizeDesc(a, b) {
  if (a.size < b.size) {
    return -1;
  }
  if (a.size > b.size) {
    return 1;
  }
  return 0;
}

export function comparePriorityDesc(a, b) {
  if (a.priority > b.priority) {
    return -1;
  }
  if (a.priority < b.priority) {
    return 1;
  }
  return 0;
}

export function compareDateAddedDesc(a, b) {
  let dateA = new Date(a.dateAdded);
  let dateB = new Date(b.dateAdded);
  if (dateA > dateB) {
    return -1;
  }
  if (dateA < dateB) {
    return 1;
  }
  return 0;
}