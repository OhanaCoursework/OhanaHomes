import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Islands from "../../../../Pages/home/components/Islands";
import { Island } from "../../../../data/enum/islandsEnum.js";

configure({ adapter: new Adapter() });

describe("Islands component", () => {
  const islands = [
    {
      island: Island.Hawaii,
      image: "hawaiiImage.webp",
      alt: "An image of the coast of Hawai'i",
    },
    {
      island: Island.Maui,
      image: "mauiImage.webp",
      alt: "An image of a road on the coast of Maui",
    },
  ];

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Islands islandsData={islands} />);
  });

  it("renders island cards", () => {
    expect(wrapper.find(".islandCard")).toHaveLength(islands.length);
  });

  it("renders current cards with given data", () => {
    for (let i = 0; i < islands.length; i++) {
      expect(wrapper.find(".islandName").at(i).text()).toEqual(
        islands[i].island.uiText
      );
      expect(wrapper.find(".islandImage").at(i).prop("src")).toEqual(
        islands[i].image
      );
      expect(wrapper.find(".islandImage").at(i).prop("alt")).toEqual(
        islands[i].alt
      );
      const islandName = wrapper.find(".islandName").at(i).text().toLowerCase();
      expect(wrapper.find(".islandLink").at(i).prop("href")).toEqual(
        islandName
      );
    }
  });
});
