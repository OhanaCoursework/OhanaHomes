import React from "react";
import { shallow, configure } from "enzyme";
import IslandsPage from "../../../../Pages/islands/components/IslandsPage";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("IslandsPage component", () => {
  const islandData = {
    island: "Hawaii",
    image: "hawaii.jpg",
    alt: "Hawaii",
    description: "A beautiful tropical paradise",
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<IslandsPage islandData={islandData} />);
  });

  it("renders the island name and image", () => {
    expect(wrapper.find(".PageHeading").text()).toEqual("Hawaii");
    expect(wrapper.find(".HeadingImage").prop("src")).toEqual("hawaii.jpg");
    expect(wrapper.find(".HeadingImage").prop("alt")).toEqual("Hawaii");
  });

  it("renders the description and a link to marketplace", () => {
    expect(wrapper.find("#OurStoryHeading").text()).toEqual(
      "Why visit Hawaii?"
    );
    expect(wrapper.find(".paragraph1").text()).toEqual(
      "A beautiful tropical paradise"
    );
    expect(wrapper.find(".islandPageButton").prop("href")).toEqual(
      "/marketplace"
    );
    expect(wrapper.find(".islandPageButton").text()).toEqual(
      "View Homes On This Island"
    );
  });
});
