const { assert } = require("chai");
const fs = require("fs");
const path = require("path");
const chrome = require("selenium-webdriver/chrome");
const { Builder, By } = require("selenium-webdriver");

const myoptions = new chrome.Options().headless().addArguments("disable-gpu");
const TIMEOUT = 6000;
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

describe("Selenium Tests for Islands Page", function () {
  it("Should be able to navigate to the Islands Page from the Islands Section", async function () {
    // Navigate to the home page
    await driver.get("http://localhost:3000/");

    const islandText = await driver
      .findElement(By.className("islandName"))
      .getText();

    await driver.findElement(By.className("islandCard")).click();

    const pageTitle = await driver
      .findElement(By.className("PageHeading"))
      .getText();
    assert.strictEqual(pageTitle, islandText);

  });
  it("Should be able to use the view homes button ", async function () {
    await driver.findElement(By.id("marketplaceBtn")).click();

    assert.strictEqual(
      "http://localhost:3000/marketplace",
      await driver.getCurrentUrl()
    );
  });
});
