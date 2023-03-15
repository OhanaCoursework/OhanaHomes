import { renderer, screen, cleanup } from "@testing-library/react";
import AboutUs from "../../Pages/aboutUs/components/aboutUs";
import "@testing-library/jest-dom"
import { render } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

Enzyme.configure({ adapter: new Adapter() });

afterEach(() => {
  cleanup();
});

describe("Should Render All Components on About us Page", () => {
  render(<AboutUs />);
  it("should render All the Images", () => {
    expect(screen.queryByTestId("HeadingImage")).toBeDefined();
    expect(screen.queryByTestId("OurOwnerImage")).toBeDefined();
  })
  it("should render All the headings on the page", () => {
    expect(screen.queryByTestId("PageHeading")).toBeDefined();
    expect(screen.queryByTestId("OurStoryHeading")).toBeDefined();
    expect(screen.queryByTestId("OurStoryHeading")).toBeDefined();
  })
  it("should render all paragraphs", () => {
    expect(screen.queryByTestId("paragraph1")).toBeDefined();
    expect(screen.queryByTestId("paragraph2")).toBeDefined();
    expect(screen.queryByTestId("paragraph3")).toBeDefined();
    expect(screen.queryByTestId("paragraph4")).toBeDefined();
    expect(screen.queryByTestId("paragraph5")).toBeDefined();
  })
  it("should render the heading Image", () => {
  })
});
