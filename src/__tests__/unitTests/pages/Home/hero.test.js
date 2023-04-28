import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Hero from "../../../../Pages/home/components/Hero.js";
import Button from "../../../../Pages/home/components/Button";

configure({ adapter: new Adapter() });

describe("Hero component", () => {
  const slides = [
    {
      image: "image1.jpg",
      alt: "Image 1",
      title: "Title 1",
      price: "Price 1",
      label: "Label 1",
    },
    {
      image: "image2.jpg",
      alt: "Image 2",
      title: "Title 2",
      price: "Price 2",
      label: "Label 2",
    },
  ];

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Hero slides={slides} />);
  });

  it("renders slides", () => {
    expect(wrapper.find(".HeroSlide")).toHaveLength(slides.length);
  });

  it("renders current slide with HeroSlider class", () => {
    expect(wrapper.find(".HeroSlider").length).toEqual(1);
  });

  it("renders Button component with correct props", () => {
    const button = wrapper.find(Button);
    expect(button.prop("css")).toEqual(
      expect.stringContaining("font-size: clamp(0.5rem, 3vw, 1rem)")
    );
  });

  it("renders next slide when nextSlide function is called", () => {
    const nextSlideButton = wrapper.find(".arrowButtons").at(1);
    nextSlideButton.simulate("click");

    const currentSlide = wrapper.find(".HeroSlide").at(1);
    expect(currentSlide.exists()).toBeTruthy();
  });

  it("renders previous slide when prevSlide function is called", () => {
    const prevSlideButton = wrapper.find(".arrowButtons").at(0);
    prevSlideButton.simulate("click");

    const currentSlide = wrapper.find(".HeroSlide").at(slides.length - 1);
    expect(currentSlide.exists()).toBeTruthy();
  });
});
