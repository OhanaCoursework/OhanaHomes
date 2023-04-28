import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Marketplace from "../../../../Pages/marketplace/components/Marketplace";
import * as marketPlaceService from "../../../../Pages/marketplace/components/marketplace.service";
import marketHouse1 from "../../../../assets/images/marketPlace/marketHouse1.webp";
import marketHouse2 from "../../../../assets/images/marketPlace/marketHouse2.webp";
import marketHouse3 from "../../../../assets/images/marketPlace/marketHouse3.webp";
import { Island } from "../../../../data/enum/islandsEnum";

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

configure({ adapter: new Adapter() });

describe("Marketplace page", () => {
  let wrapper;
  let marketPlaceServiceSpy;

  beforeEach(() => {
    marketPlaceServiceSpy = jest
      .spyOn(marketPlaceService, "getMarketplaceData")
      .mockReturnValue(buyMockValues);
  });

  afterEach(() => {
    marketPlaceServiceSpy.mockRestore();
  });

  it("should display rent title when type is rent", () => {
    wrapper = shallow(
      <Marketplace marketplaceType="rent" intialSearchQuery="" />
    );
    expect(wrapper.find("#PageHeading").text()).toEqual("Properties For Rent");
  });

  it("should display buy title when type is buy", () => {
    wrapper = shallow(
      <Marketplace marketplaceType="buy" intialSearchQuery="" />
    );
    expect(wrapper.find("#PageHeading").text()).toEqual("Properties For Sale");
  });

  it("should pass rent type correctly to marketplace.service from props", () => {
    wrapper = shallow(
      <Marketplace marketplaceType="rent" intialSearchQuery="" />
    );
    expect(marketPlaceServiceSpy).toHaveBeenCalledWith(
      "",
      undefined,
      "recent",
      "rent"
    );
  });
  it("should pass buy type correctly to marketplace.service from props", () => {
    wrapper = shallow(
      <Marketplace marketplaceType="buy" intialSearchQuery="" />
    );
    expect(marketPlaceServiceSpy).toHaveBeenCalledWith(
      "",
      undefined,
      "recent",
      "buy"
    );
  });

  it("should pass search query and sorting correctly to marketplace.service", () => {
    wrapper = shallow(
      <Marketplace marketplaceType="buy" intialSearchQuery="east maui" />
    );
    expect(marketPlaceServiceSpy).toHaveBeenCalledWith(
      "east maui",
      undefined,
      "most-relevant",
      "buy"
    );
  });

  it("should pass no search query and sorting correctly to marketplace.service when no intialSearchQuery", () => {
    wrapper = shallow(
      <Marketplace marketplaceType="buy" intialSearchQuery="" />
    );
    expect(marketPlaceServiceSpy).toHaveBeenCalledWith(
      "",
      undefined,
      "recent",
      "buy"
    );
  });
});
