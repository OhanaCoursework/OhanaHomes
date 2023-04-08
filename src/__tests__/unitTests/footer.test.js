import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Footer from "../../generalComponents/footer/Footer.js";
import facebookIcon from "../../assets/images/icons/facebookIcon.svg";
import instagramIcon from "../../assets/images/icons/instagramIcon.svg";
import twitterIcon from "../../assets/images/icons/twitterIcon.svg";
import websiteLogo from "../../assets/images/logo/footerLogo.svg";

configure({ adapter: new Adapter() });

describe("Footer component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });

  it("renders a footer element", () => {
    expect(wrapper.find("footer").length).toBe(1);
  });

  it("renders a h1 element with Contact Us", () => {
    expect(wrapper.find("h1").text()).toEqual("Contact Us");
  });

  it("renders a p element with the address", () => {
    expect(wrapper.find(".Column1").find("p").at(0).text()).toEqual(
      "2121 North Nimitz Highway, Honolulu, HI 96819, United States"
    );
  });

  it("renders a p element with the email", () => {
    expect(wrapper.find(".Column1").find("p").at(1).text()).toEqual("testemail@email.com");
  });

  it("renders a p element with the phone number", () => {
    expect(wrapper.find(".Column1").find("p").at(2).text()).toEqual("(+1) 930-231-1231");
  });

  it("renders 4 Link elements", () => {
    expect(wrapper.find(".Column2").find("a").length).toEqual(4);
  });

  it("renders a Facebook icon", () => {
    expect(wrapper.find("img[src=\"" + facebookIcon + "\"]").length).toEqual(1);
  });

  it("renders a Twitter icon", () => {
    expect(wrapper.find("img[src=\"" + twitterIcon + "\"]").length).toEqual(1);
  });

  it("renders an Instagram icon", () => {
    expect(wrapper.find("img[src=\"" + instagramIcon + "\"]").length).toEqual(1);
  });

  it("renders a website logo", () => {
    expect(wrapper.find("img[src=\"" + websiteLogo + "\"]").length).toEqual(1);
  });
});
