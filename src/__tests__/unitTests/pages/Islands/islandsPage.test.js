import React from "react";
import { shallow, configure } from "enzyme";
import {IslandsPage} from "../../../../Pages/islands/components/IslandsPage.js";
import Adapter from "enzyme-adapter-react-16";
import { Island } from "../../../../data/enum/islandsEnum";

configure({ adapter: new Adapter() });

describe("IslandsPage component", () => {
  const islandData = {
    island: Island.Hawaii,
    image: "hawaii.jpg",
    alt: "Hawaii",
    description: "A beautiful tropical paradise",
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<IslandsPage islandData={islandData} />);
  });

  it("renders the island name and image", () => {
    expect(wrapper.find(".PageHeading").text()).toEqual("Hawai'i");
    expect(wrapper.find(".HeadingImage").prop("src")).toEqual("hawaii.jpg");
    expect(wrapper.find(".HeadingImage").prop("alt")).toEqual("Hawaii");
  });

  it("renders the description and a link to marketplace", () => {
    expect(wrapper.find("#OurStoryHeading").text()).toEqual(
      "Why visit Hawai'i?"
    );
    expect(wrapper.find(".paragraph1").text()).toEqual(
      "A beautiful tropical paradise"
    );
    expect(wrapper.find(".islandPageButton").prop("href")).toEqual(
      "/marketplace?type=buy&island=hawai'i"
    );
    expect(wrapper.find(".islandPageButton").text()).toEqual(
      "View Homes On This Island"
    );
  });
});
