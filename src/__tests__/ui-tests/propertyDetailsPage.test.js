const { assert } = require("chai");
const chrome = require("selenium-webdriver/chrome");
const { Builder, By } = require("selenium-webdriver");

const myoptions = new chrome.Options().headless().addArguments("disable-gpu");
const TIMEOUT = 10000;
let driver;

beforeAll(async function () {
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(myoptions)
    .build();
  await driver
    .manage()
    .setTimeouts({ implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT });
});

afterAll(async function () {
    await driver.quit();
  });

describe("Selenium Tests for Property Details Page", function () {
  it("Should display the correct property information based on the id parameter in the URL", async function () {
    // Navigate to a property details page
    await driver.get("http://localhost:3000/propertyDetails/1");
    await driver.manage().window().setRect({ width: 1401, height: 800 });

    // Check that the page title contains the property name
    const pageTitle = await driver.findElement(By.tagName("h2")).getText();
    assert.include(pageTitle.toLowerCase(), "property 1");

    // Check that the property details are displayed correctly
    const details = await driver.findElement(By.className("propertyDetailsBlock")).getText();
    assert.include(details, "Address: 123 Main St");
    assert.include(details, "Price: $500,000");
    assert.include(details, "Bedrooms: 3");
    assert.include(details, "Bathrooms: 2");
    assert.include(details, "Size (sq/Ft): 2000");
    assert.include(details, "Island: No");
    assert.include(details, "Zipcode: 12345");
    assert.include(details, "Move In Date: 12/31/2023");
    assert.include(details, "Date Added: 01/01/2023");

    // Check that the property images are displayed correctly
    const images = await driver.findElements(By.css(".gallery img"));
    assert.strictEqual(images.length, 3);
    assert.include(await images[0].getAttribute("src"), "property1-image1.jpg");
    assert.include(await images[1].getAttribute("src"), "property1-image2.jpg");
    assert.include(await images[2].getAttribute("src"), "property1-image3.jpg");
  });
});
