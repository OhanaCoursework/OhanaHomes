const { assert } = require("chai");
const chrome = require("selenium-webdriver/chrome");
const { Builder, By } = require("selenium-webdriver");

const myoptions = new chrome.Options();
myoptions.addArguments("disable-gpu");
myoptions.headless();

const mobileOptions = new chrome.Options();
mobileOptions.addArguments("disable-gpu");
mobileOptions.headless();

const TIMEOUT = 10000;

describe("Selenium Tests for Islands grid", function () {
  let driver;

  afterAll(async () => {
    await driver.quit();
  });

  describe("Desktop Tests", () => {
    beforeEach(async () => {
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(myoptions)
        .build();

      await driver
        .manage()
        .setTimeouts({ implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT });
    });

    it("Should display 8 islands", async function () {
      await driver.get("http://localhost:3000/");

      const islandCards = await driver.findElements(By.className("islandCard"));

      assert.equal(islandCards.length, 8);
    });

    it("Should display view homes button when user hovers over island card", async function () {
      await driver.get("http://localhost:3000/");

      const viewHomesButton = await driver.findElement(
        By.className("islandButton")
      );

      assert.isFalse(await viewHomesButton.isDisplayed());

      const islandCard = await driver.findElement(By.className("islandCard"));

      const actions = driver.actions({ async: true });
      await actions.move({ origin: islandCard }).perform();

      await driver.sleep(500);

      assert.isTrue(await viewHomesButton.isDisplayed());
    });

    it("Should navigate to islands page when an island card is clicked", async function () {
      await driver.get("http://localhost:3000/");

      await driver.findElement(By.className("islandCard")).click();

      assert.strictEqual(
        "http://localhost:3000/islands",
        await driver.getCurrentUrl()
      );
    });
  });

  describe("Mobile Tests", () => {
    beforeEach(async () => {
      mobileOptions.setMobileEmulation({ deviceName: "iPhone SE" });
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(mobileOptions)
        .build();

      await driver
        .manage()
        .setTimeouts({ implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT });
    });

    it("Should always display view homes button when users device cant hover", async function () {
      await driver.get("http://localhost:3000/");

      assert.isTrue(
        await driver.findElement(By.className("islandButton")).isDisplayed()
      );
    });
  });
});
