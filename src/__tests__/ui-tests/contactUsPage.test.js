const { assert } = require("chai");
const chrome = require("selenium-webdriver/chrome");
const { Builder, By } = require("selenium-webdriver");

const myoptions = new chrome.Options().headless().addArguments("disable-gpu");
const TIMEOUT = 8000;
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

describe("Selenium Tests for Contact Us Page", function () {
  it("Should be able to navigate to the Contact Us Page from the Hero Section", async function () {
    // Navigate to the home page
    await driver.get("http://localhost:3000/");
    await driver.manage().window().setRect({ width: 1401, height: 800 });
    await driver.findElement(By.linkText("Contact")).click();

    const pageTitle = await driver.findElement(By.id("PageHeading")).getText();
    assert.strictEqual(pageTitle, "Contact Us");
  });
  it("Should be able to navigate to each relevant page from quick links", async function () {
    // Navigate to the home page
    await driver.get("http://localhost:3000/contactUs");
    await driver.findElement(By.linkText("About Us")).click();

    const pageTitleContactUs = await driver.findElement(By.id("PageHeading")).getText();
    assert.strictEqual(pageTitleContactUs, "About Us");

    await driver.get("http://localhost:3000/contactUs");
    await driver.findElement(By.linkText("Marketplace")).click();

    const pageTitleMarketplace = await driver.findElement(By.id("PageHeading")).getText();
    assert.strictEqual(pageTitleMarketplace, "Properties For Rent");

    await driver.get("http://localhost:3000/contactUs");
    await driver.findElement(By.linkText("Home")).click();

    assert.strictEqual(
      "http://localhost:3000/",
      await driver.getCurrentUrl()
    );  
  });
});
