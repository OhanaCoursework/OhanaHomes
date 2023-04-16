const { assert } = require("chai");
const chrome = require("selenium-webdriver/chrome");
const { Builder, By } = require("selenium-webdriver");

const myoptions = new chrome.Options();
myoptions.addArguments("disable-gpu");
myoptions.headless();

const TIMEOUT = 10000;

describe("Selenium Tests for Islands grid", function () {
  let driver;

  beforeAll(async () => {
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(myoptions)
      .build();

    await driver
      .manage()
      .setTimeouts({ implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT });
  });

  afterAll(async () => {
    await driver.quit();
  });

  it("Should display 8 islands", async function () {
    await driver.get("http://localhost:3000/");

    const islandCards = await driver.findElements(By.className("islandCard"));

    assert.equal(islandCards.length, 8);
  });

  it("Should navigate to islands page when an island card is clicked", async function () {
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(mobileOptions)
      .build();

    await driver
      .manage()
      .setTimeouts({ implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT });

    await driver.findElement(By.className("islandCard")).click();

    assert.strictEqual(
      "http://localhost:3000/islands",
      await driver.getCurrentUrl()
    );
  });
});
