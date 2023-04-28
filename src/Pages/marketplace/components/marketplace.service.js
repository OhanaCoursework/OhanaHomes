import { MarketplaceTypeEnum } from "../../../data/enum/MarketplaceTypeEnum";
import {
  compareDateAddedDesc,
  comparePriorityDesc,
  comparePropertiesPriceAsc,
  comparePropertiesPriceDesc,
  compareSizeAsc,
  compareSizeDesc,
  getBuyMarketplaceData,
  getRentMarketplaceData,
} from "../../../data/featuredPropetiesData/featuredPropertiesDataHelper";
import { getPrice } from "../../../data/enum/pricesEnum";

export function getMarketplaceData(
  searchQuery,
  appliedFilters,
  appliedSorting,
  type
) {
  let intialMarketplaceData = [...getDefaultMarketplaceData(type)];

  let searchResults;
  if (searchQuery && searchQuery.trim()) {
    searchResults = search(
      searchQuery.trim().toLowerCase(),
      intialMarketplaceData
    );

    if (!searchResults || !searchResults.length) {
      return searchResults;
    }
  }

  let filteredPropertyData = filterPropertyData(
    searchResults ? searchResults : intialMarketplaceData,
    appliedFilters
  );

  return sortPropertyData(filteredPropertyData, appliedSorting);
}

function getDefaultMarketplaceData(marketplaceType) {
  if (marketplaceType === MarketplaceTypeEnum.Buy) {
    return getBuyMarketplaceData();
  } else {
    return getRentMarketplaceData();
  }
}

function search(searchQuery, intialMarketplaceData) {
  let results = [];
  let regMap = searchQuery
    .split(" ")
    .filter(function (word) {
      return word.length > 1;
    })
    .map(function (word) {
      return new RegExp("\\b" + word + "\\b", "gi");
    });

  if (regMap.length > 0) {
    results = intialMarketplaceData.reduce((results, property) => {
      let priority = 0;

      property.regions.forEach((region) => {
        let regionRegex = new RegExp(
          "\\b" + region.toLowerCase() + "\\b",
          "gi"
        );
        if (searchQuery.match(regionRegex)) {
          priority += 100;
        }
      });

      for (let reg of regMap) {
        if (property.island.toString().toLowerCase().trim().match(reg)) {
          priority += 10;
        }
        if (property.zipcode.toString().toLowerCase().trim().match(reg)) {
          priority += 1000;
        }
        if (property.title.toString().toLowerCase().trim().match(reg)) {
          priority += 1;
        }
        if (property.address.toString().toLowerCase().trim().match(reg)) {
          priority += 1;
        }
      }

      if (priority > 0) {
        results.push({ ...property, priority: priority });
      }

      return results;
    }, []);
  }

  return results;
}

function filterPropertyData(propertyData, appliedFilters) {
  if (appliedFilters && Object.keys(appliedFilters).length) {
    for (const [key, value] of Object.entries(appliedFilters)) {
      switch (key) {
        case "minPrice":
          if (value) {
            propertyData = propertyData.filter(
              (house) => getPrice(house.price) > value
            );
          }
          break;
        case "maxPrice":
          if (value) {
            propertyData = propertyData.filter(
              (house) => getPrice(house.price) < value
            );
          }
          break;
        case "island":
          if (value) {
            propertyData = propertyData.filter(
              (house) => house.island === value
            );
          }
          break;
        case "beds":
          propertyData = propertyData.filter(
            (house) => house.bedrooms >= value
          );
          break;
        case "baths":
          propertyData = propertyData.filter(
            (house) => house.bathrooms >= value
          );
          break;
        case "moveInDate":
          propertyData = propertyData.filter(
            (house) => house.moveInDate > value
          );
          break;
      }
    }
  }

  return propertyData;
}

function sortPropertyData(propertyData, appliedSorting) {
  switch (appliedSorting) {
    case "biggest":
      propertyData.sort(compareSizeAsc);
      break;
    case "smallest":
      propertyData.sort(compareSizeDesc);
      break;
    case "lowest":
      propertyData.sort(comparePropertiesPriceAsc);
      break;
    case "highest":
      propertyData.sort(comparePropertiesPriceDesc);
      break;
    case "recent":
      propertyData.sort(compareDateAddedDesc);
      break;
    case "most-relevant":
      if (propertyData && propertyData.length && propertyData[0].priority) {
        propertyData.sort(comparePriorityDesc);
      }
      break;
    default:
      break;
  }

  return propertyData;
}
