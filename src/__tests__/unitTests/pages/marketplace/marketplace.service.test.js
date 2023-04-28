import { getMarketplaceData } from "../../../../Pages/marketplace/components/marketplace.service";
import * as featuredPropertiesDataHelper from "../../../../helpers/featuredPropetiesData/featuredPropertiesDataHelper";
import marketHouse1 from "../../../../assets/images/marketPlace/marketHouse1.webp";
import marketHouse2 from "../../../../assets/images/marketPlace/marketHouse2.webp";
import marketHouse3 from "../../../../assets/images/marketPlace/marketHouse3.webp";
import { Island } from "../../../../helpers/islandsData/islandsEnum";

const buyMockValues = [
  {
    title: "Luxury Villa, Hawaii",
    price: "4,100,000",
    image: marketHouse1,
    alt: "House",
    bedrooms: 7,
    bathrooms: 3,
    size: 464,
    dateAdded: "2018-12-10T13:45:00.000Z",
    address: "123 Nimitz Highway",
    island: Island.Maui.value,
    zipcode: "90210",
    regions: ["West Maui", "Kapalua"],
    moveInDate: "2021-12-10",
  },
  {
    title: "House in Honolulu, Hawaii",
    price: "2,680,000",
    image: marketHouse2,
    alt: "House",
    bedrooms: 5,
    bathrooms: 4,
    size: 484,
    dateAdded: "2019-12-10T13:45:00.000Z",
    address: "94 Kunia Road",
    island: Island.Oahu.value,
    zipcode: "96210",
    regions: ["Honolulu"],
    moveInDate: "2022-05-10",
  },
  {
    title: "Modern House in O'ahu, Hawaii",
    price: "11,500,000",
    image: marketHouse3,
    alt: "House",
    bedrooms: 8,
    bathrooms: 3,
    size: 833,
    dateAdded: "2018-03-02T13:45:00.000Z",
    address: "123 Nimitz Highway",
    island: Island.Oahu.value,
    zipcode: "96420",
    regions: ["Leeward Coast", "Makaha"],
    moveInDate: "2021-11-10",
  },
];

const rentMockValues = [
  {
    title: "Luxury Villa, Hawaii",
    price: "4,100pm",
    image: marketHouse1,
    alt: "House",
    bedrooms: 7,
    bathrooms: 3,
    size: 464,
    dateAdded: "2018-12-10T13:45:00.000Z",
    address: "123 Nimitz Highway",
    island: Island.Maui.value,
    zipcode: "90210",
    regions: ["West Maui", "Kapalua"],
    moveInDate: "2021-12-10",
  },
  {
    title: "House in Honolulu, Hawaii",
    price: "2,680pm",
    image: marketHouse2,
    alt: "House",
    bedrooms: 5,
    bathrooms: 4,
    size: 484,
    dateAdded: "2019-12-10T13:45:00.000Z",
    address: "94 Kunia Road",
    island: Island.Oahu.value,
    zipcode: "96210",
    regions: ["Honolulu"],
    moveInDate: "2022-05-10",
  },
  {
    title: "Modern House in O'ahu, Hawaii",
    price: "11,500pm",
    image: marketHouse3,
    alt: "House",
    bedrooms: 8,
    bathrooms: 3,
    size: 833,
    dateAdded: "2018-03-02T13:45:00.000Z",
    address: "123 Nimitz Highway",
    island: Island.Oahu.value,
    zipcode: "96420",
    regions: ["Leeward Coast", "Makaha"],
    moveInDate: "2021-11-10",
  },
];

describe("Marketplace Service - ", () => {
  describe("getMarketplaceData", () => {
    let getBuyMarketplaceDataSpy;
    let getRentMarketplaceDataSpy;

    beforeEach(() => {
      getBuyMarketplaceDataSpy = jest
        .spyOn(featuredPropertiesDataHelper, "getBuyMarketplaceData")
        .mockReturnValue(buyMockValues);
        getRentMarketplaceDataSpy = jest
        .spyOn(featuredPropertiesDataHelper, "getRentMarketplaceData")
        .mockReturnValue(rentMockValues);
    });

    afterEach(() => {
      getBuyMarketplaceDataSpy.mockRestore();
      getRentMarketplaceDataSpy.mockRestore();
    });

    it("should return buy data correctly with no other params", () => {
      let result = getMarketplaceData('', {}, '', 'buy');
      expect(result).toStrictEqual(buyMockValues);
    });

    it("should return rent data correctly with no other params", () => {
      let result = getMarketplaceData('', {}, '', 'rent');
      expect(result).toStrictEqual(rentMockValues);
    });

    describe("search", () => {
      it("should return no properties when searching does not show anything", () => {
        let result = getMarketplaceData('asfasfsfadfs', {}, '', 'buy');
        expect(result).toStrictEqual([]);
      });
      it("should ignore searchQuery if it is only white space", () => {
        let result = getMarketplaceData('    ', {}, '', 'buy');
        expect(result).toStrictEqual(buyMockValues);
      });
      it("should look for matches with a propertys island field when searching and return priority", () => {
        let result = getMarketplaceData('maui', {}, '', 'buy');
        expect(result).toStrictEqual([{...buyMockValues[0], priority: 10}]);
      });
      it("should convert searchQury to lowercase when searching", () => {
        let result = getMarketplaceData('MAUI', {}, '', 'buy');
        expect(result).toStrictEqual([{...buyMockValues[0], priority: 10}]);
      });
      it("should look for matches with a propertys title field when searching", () => {
        let result = getMarketplaceData('Luxury', {}, '', 'buy');
        expect(result).toStrictEqual([{...buyMockValues[0], priority: 1}]);
      });
      it("should split searchQuery into substrings and look matches with substring", () => {
        let result = getMarketplaceData('Luxury House', {}, '', 'buy');
        expect(result).toStrictEqual([{...buyMockValues[0], priority: 1}, {...buyMockValues[1], priority: 1}, {...buyMockValues[2], priority: 1}]);
      });
      it("should look at keywords field when searching", () => {
        let result = getMarketplaceData('Honolulu', {}, '', 'buy');
        expect(result).toStrictEqual([{...buyMockValues[1], priority: 101}]);
      });
      it("should look at zipcode field when searching", () => {
        let result = getMarketplaceData('90210', {}, '', 'buy');
        expect(result).toStrictEqual([{...buyMockValues[0], priority: 1000}]);
      });
      it("should look at address field when searching", () => {
        let result = getMarketplaceData('Kunia', {}, '', 'buy');
        expect(result).toStrictEqual([{...buyMockValues[1], priority: 1}]);
      });
    });

    describe("filtering", () => {
      it("should filter by island correctly", () => {
        let result = getMarketplaceData('', {island: Island.Maui.value}, '', 'buy');
        expect(result).toStrictEqual([buyMockValues[0]]);
      });
      it("should filter by minPrice correctly for buy", () => {
        let result = getMarketplaceData('', {minPrice: 3000000}, '', 'buy');
        expect(result).toStrictEqual([buyMockValues[0], buyMockValues[2]]);
      });
      it("should filter by maxPrice correctly for buy", () => {
        let result = getMarketplaceData('', {maxPrice: 3000000}, '', 'buy');
        expect(result).toStrictEqual([buyMockValues[1]]);
      });
      it("should filter by minPrice correctly for rent", () => {
        let result = getMarketplaceData('', {minPrice: 3000}, '', 'rent');
        expect(result).toStrictEqual([rentMockValues[0], rentMockValues[2]]);
      });
      it("should filter by maxPrice correctly for rent", () => {
        let result = getMarketplaceData('', {maxPrice: 3000}, '', 'rent');
        expect(result).toStrictEqual([rentMockValues[1]]);
      });
      it("should filter by beds correctly", () => {
        let result = getMarketplaceData('', {beds: 6}, '', 'buy');
        expect(result).toStrictEqual([buyMockValues[0], buyMockValues[2]]);
      });
      it("should filter by baths correctly", () => {
        let result = getMarketplaceData('', {baths: 4}, '', 'buy');
        expect(result).toStrictEqual([buyMockValues[1]]);
      });
      it("should filter by moveInDate correctly", () => {
        let result = getMarketplaceData('', {moveInDate: "2021-12-20"}, '', 'buy');
        expect(result).toStrictEqual([buyMockValues[1]]);
      });
    });

    describe("sorting", () => {
      it("should sort by most-relevant correctly when searching occurs", () => {
        let result = getMarketplaceData('Luxury Honolulu', {}, 'most-relevant', 'buy');
        expect(result).toStrictEqual([{...buyMockValues[1], priority: 101},{...buyMockValues[0], priority: 1}]);
      });
      it("should sort by date added correctly", () => {
        let result = getMarketplaceData('', {}, 'recent', 'buy');
        expect(result).toStrictEqual([buyMockValues[1], buyMockValues[0], buyMockValues[2]]);
      });
      it("should sort by price asc correctly for buy", () => {
        let result = getMarketplaceData('', {}, 'lowest', 'buy');
        expect(result).toStrictEqual([buyMockValues[1], buyMockValues[0], buyMockValues[2]]);
      });
      it("should sort by price desc correctly for buy", () => {
        let result = getMarketplaceData('', {}, 'highest', 'buy');
        expect(result).toStrictEqual([buyMockValues[2], buyMockValues[0], buyMockValues[1]]);
      });
      it("should sort by price asc correctly for rent", () => {
        let result = getMarketplaceData('', {}, 'lowest', 'rent');
        expect(result).toStrictEqual([rentMockValues[1], rentMockValues[0], rentMockValues[2]]);
      });
      it("should sort by price desc correctly for rent", () => {
        let result = getMarketplaceData('', {}, 'highest', 'rent');
        expect(result).toStrictEqual([rentMockValues[2], rentMockValues[0], rentMockValues[1]]);
      });
      it("should sort by size desc correctly", () => {
        let result = getMarketplaceData('', {}, 'biggest', 'buy');
        expect(result).toStrictEqual([buyMockValues[2], buyMockValues[1], buyMockValues[0]]);
      });
      it("should sort by size asc correctly", () => {
        let result = getMarketplaceData('', {}, 'smallest', 'buy');
        expect(result).toStrictEqual([buyMockValues[0], buyMockValues[1], buyMockValues[2]]);
      });
    });
  });
});
