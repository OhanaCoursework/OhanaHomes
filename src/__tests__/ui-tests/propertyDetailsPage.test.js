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
    const pageTitle = await driver.findElement(By.className("propertyTitle")).getText();
    assert.include(pageTitle.toLowerCase(), "luxury villa in maui, hawaii");

    // Check that the property details are displayed correctly
    const details = await driver.findElement(By.className("propertyDetailsBlock")).getText();
    assert.include(details, "Address: 123 Nimitz Highway");
    assert.include(details, "Price: 4,100,000");
    assert.include(details, "Bedrooms: 5");
    assert.include(details, "Bathrooms: 3");
    assert.include(details, "Size (sq/Ft): 464");
    assert.include(details, "Zipcode: 90210");
    assert.include(details, "Move In Date: 2021/12/10");
    assert.include(details, "Date Added: 2018/12/10");

    
  });
});
