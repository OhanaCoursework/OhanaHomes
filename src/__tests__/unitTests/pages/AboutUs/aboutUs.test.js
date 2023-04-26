import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AboutUs from "../../../../Pages/aboutUs/components/aboutUs";

configure({ adapter: new Adapter() });
let wrapper;

describe("Should Render All Components on About us Page", () => {
  beforeEach(() => {
    wrapper = shallow(<AboutUs />);
  });

  it("should render All the Images", () => {
    expect(wrapper.find("HeadingImage")).toBeDefined();
    expect(wrapper.find("OurOwnerImage")).toBeDefined();
  });
  it("should render All the headings on the page", () => {
    expect(wrapper.find("PageHeading")).toBeDefined();
    expect(wrapper.find("OurStoryHeading")).toBeDefined();
    expect(wrapper.find("OurStoryHeading")).toBeDefined();
  });
  it("should render all paragraphs", () => {
    expect(wrapper.find("paragraph1")).toBeDefined();
    expect(wrapper.find("paragraph2")).toBeDefined();
    expect(wrapper.find("paragraph3")).toBeDefined();
    expect(wrapper.find("paragraph4")).toBeDefined();
    expect(wrapper.find("paragraph5")).toBeDefined();
  });
});
