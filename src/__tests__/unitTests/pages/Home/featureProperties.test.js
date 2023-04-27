import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FeaturedProperties from "../../../../Pages/home/components/featuredProperties";
import HouseItem from "../../../../Pages/home/components/houseItem.js";
import CardData from "/src/helpers/featuredPropertiesData/buyPropertiesData.js";


configure({ adapter: new Adapter() });

describe("FeaturedProperties component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FeaturedProperties cardData={CardData} />); // Pass currentPage as a prop
  });

  it("renders the correct number of HouseItem components based on itemsPerPage", () => {
    const itemsPerPage = 4;
    const currentPage = 0;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const houseItems = wrapper.find(HouseItem);
    expect(houseItems).toHaveLength(
      CardData.slice(startIndex, endIndex).length
    );
  });

  it("renders the correct title text", () => {
    const titleText = wrapper.find(".title-text");
    expect(titleText.text()).toEqual("Featured Homes");
  });

  it("increments the currentPage state when handleForward function is called", () => {
    const firstRow = wrapper.find(HouseItem).at(0).props().image;
    const forwardBtn = wrapper.find(".arrowButtons").at(0);
    forwardBtn.simulate("click");

    const secondRow = wrapper.find(HouseItem).at(1).props().image;
    expect(firstRow).not.toEqual(secondRow);
  });

  it("decrements the currentPage state when handleBack function is called", () => {
    const forwardBtn = wrapper.find(".arrowButtons").at(0);
    forwardBtn.simulate("click");
    const secondRow = wrapper.find(HouseItem).at(1).props().image;

    const backBtn = wrapper.find(".arrowButtons").at(0);
    backBtn.simulate("click");
    const firstRow = wrapper.find(HouseItem).at(0).props().image;

    expect(secondRow).not.toEqual(firstRow);
  });
});
