import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ContactUs from "../../Pages/contactUs/components/contactUs";
import { isEmailValid } from "../../helpers/validators/emailValidator.js";
import { assert } from "chai";

configure({ adapter: new Adapter() });
let wrapper;

describe("Should Render All Components on About us Page", () => {
  beforeEach(() => {
    wrapper = shallow(<ContactUs />);
  });

  it("renders the title block image", () => {
    expect(wrapper.find("HeadingImage")).toBeDefined();
  });

  it("renders the header text", () => {
    expect(wrapper.find("h1", {name: "PageHeading"}).text()).toEqual("Contact Us");
    expect(wrapper.find("h2", {name: "usefulLinksHeader"}).at(0).text()).toEqual("Useful Links");
    expect(wrapper.find("h2", {name: "getInContactHeader"}).at(1).text()).toEqual("Get in Contact");
    expect(wrapper.find("h2", {name: "whereToFindUsHeader"}).at(2).text()).toEqual("Where to Find Us");
    expect(wrapper.find("h3").text()).toEqual("Leave us a review or get in contact with our team");
  });

  it("renders the buttons with correct text", () => {
    expect(wrapper.find("button", {name: "LinkToAboutUs"}).at(0).text()).toEqual("About Us");
    expect(wrapper.find("button", {name: "LinkToMarketPlace"}).at(1).text()).toEqual("Marketplace");
    expect(wrapper.find("button", {name: "LinkToHome"}).at(2).text()).toEqual("Home");
    expect(wrapper.find("button", {name: "sendButton"}).at(3).text()).toEqual("Send");
  });

  it("renders the Iframe", () => {
    expect(wrapper.find("iframe", {name: 'whereToFindUsMap'})).toBeDefined();
  });


});

describe("Email Validator should only accept valid emails", () => {
  let testNull = "";
  let testValid = "name@gmail.com";
  let testInvalid = "namegmail.com";

  it("Null Emails should not be accepted", () => {
    let testNullResponse = isEmailValid(testNull);
    assert.equal(testNullResponse, "You must enter a valid email");
  });

  it("Valid Emails should be accepted", () => {
    let testValidResponse = isEmailValid(testValid);
    assert.equal(testValidResponse, true);
  });

  it("Invalid Emails should not be accepted", () => {
    let testInvalidResponse = isEmailValid(testInvalid);
    assert.equal(testInvalidResponse, "You must enter a valid email");
  });
});


