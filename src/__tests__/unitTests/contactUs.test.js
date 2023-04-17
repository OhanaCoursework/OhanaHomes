import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ContactUs from "../../Pages/contactUs/components/contactUs";
import titleBlockImg from "../../assets/images/ContactUsTitleImage.png"

configure({ adapter: new Adapter() });
let wrapper;

describe("Should Render All Components on About us Page", () => {
  beforeEach(() => {
    wrapper = shallow(<ContactUs />);
  });

  it("renders the title block image", () => {
    expect(wrapper.find("HeadingImage").length).toBeDefined();
  });
});