import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Islands from "../../../../Pages/home/components/Islands";

configure({ adapter: new Adapter() });

describe("Islands component", () => {
  const islands = [
    {
      island: "Hawai'i",
      image: "hawaiiImage.png",
      alt: "An image of the coast of Hawai'i",
    },
    {
      island: "Maui",
      image: "mauiImage.png",
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
        islands[i].island
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
