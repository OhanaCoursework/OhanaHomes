import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Navbar from "../../../generalComponents/navbar/navbar";
import largeNavBarLogo from "../../../assets/images/logo/navbarLogo.svg";
import smallNavBarLogo from "../../../assets/images/logo/smallNavBarLogo.svg";

configure({ adapter: new Adapter() });

describe("Navbar component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Navbar />);
  });

  it("renders a navbar element", () => {
    expect(wrapper.find("nav").length).toBe(1);
  });

  it("renders a navbar element", () => {
    expect(wrapper.find("nav").length).toBe(1);
  });

  it("renders a large Brand Logo", () => {
    expect(wrapper.find('img[src="' + largeNavBarLogo + '"]').length).toEqual(
      1
    );
  });

  it("renders a small Brand Logo", () => {
    expect(wrapper.find('img[src="' + smallNavBarLogo + '"]').length).toEqual(
      1
    );
  });

  it("renders the Islands button", () => {
    expect(wrapper.find("button", { name: "Islands" }).at(0).text()).toEqual(
      "Islands"
    );
    expect(wrapper.find("a", { name: "Maui" }).at(2).text()).toEqual("Maui");
    expect(wrapper.find("a", { name: "O'ahu" }).at(3).text()).toEqual("O'ahu");
    expect(wrapper.find("a", { name: "Hawai'i" }).at(4).text()).toEqual(
      "Hawai'i"
    );
    expect(wrapper.find("a", { name: "Kaua'i" }).at(5).text()).toEqual(
      "Kaua'i"
    );
    expect(wrapper.find("a", { name: "Moloka" }).at(6).text()).toEqual(
      "Moloka'i"
    );
    expect(wrapper.find("a", { name: "Lāna'i" }).at(7).text()).toEqual(
      "Lāna'i"
    );
    expect(wrapper.find("a", { name: "Ni'ihau" }).at(8).text()).toEqual(
      "Ni'ihau"
    );
    expect(wrapper.find("a", { name: "Kaho'olawe" }).at(9).text()).toEqual(
      "Kaho'olawe"
    );
  });

  it("renders the Buy button", () => {
    expect(wrapper.find("a", { name: "Buy" }).at(0).text()).toEqual("Buy");
  });

  it("renders the Rent button", () => {
    expect(wrapper.find("a", { name: "Rent" }).at(1).text()).toEqual("Rent");
  });

  it("renders the About button", () => {
    expect(wrapper.find("a", { name: "About" }).at(10).text()).toEqual("About");
  });

  it("renders the Contact button", () => {
    expect(wrapper.find("a", { name: "Contact" }).at(11).text()).toEqual(
      "Contact"
    );
  });
});
