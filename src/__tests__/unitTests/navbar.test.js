import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Navbar from "../../generalComponents/navbar/Navbar";

configure({ adapter: new Adapter() });

describe("Navbar component", () => {
    let wrapper;
  
    beforeEach(() => {
      wrapper = shallow(<Navbar />);
    });

    it("renders a navbar element", () => {
        expect(wrapper.find("nav").length).toBe(1);
    });
});