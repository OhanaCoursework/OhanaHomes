const assert = require("assert");
const { Builder, By } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');

describe("Selenium Tests for About Us Page", function () {
  let driver;

  beforeEach(async function () {
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(new chrome.Options().headless().addArguments("disable-gpu"))
      .build();
  });

  afterEach(async function () {
    await driver.quit();
  });

  it("Should be able to navigate to the About us Page from the Hero Section", async function () {
    // Navigate to the home page
    await driver.get("http://localhost:3000/");

    await driver.findElement(By.xpath("//a")).click();

    const pageTitle = await driver.findElement(By.xpath("//h1[@id='PageHeading']")).getText();
    assert.strictEqual(pageTitle, "About Us");
  });
});
