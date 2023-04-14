const { assert } = require("chai");
const fs = require("fs");
const path = require("path");
const chrome = require("selenium-webdriver/chrome");
const { Builder, By } = require("selenium-webdriver");

const myoptions = new chrome.Options();
myoptions.addArguments("disable-gpu");
myoptions.headless();

const TIMEOUT = 10000;

describe("Selenium Tests for Hero page", function () {
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

  it("Should change slides every 5 seconds", async function () {
    await driver.get("http://localhost:3000/");

    const slideOneTitle = await driver
      .findElement(By.id("slide-title"))
      .getText();
    await driver.sleep(6000);
    const slideTwoTitle = await driver
      .findElement(By.id("slide-title"))
      .getText();

    assert.notDeepEqual(slideOneTitle, slideTwoTitle);

    const snapshotPath = path.join(
      __dirname,
      "../../assets/snapshots/HeroPage-snapshot.html"
    );
    const htmlSource = await driver.getPageSource();
    fs.writeFile(snapshotPath, htmlSource, { flag: "wx" }, function (err) {
      if (err && err.code !== "EEXIST") throw err;
      console.log("Saved!");
    });
  });

  it("Should navigate between slides using arrow buttons ", async function () {
    const forwardArrow = await driver.findElement(By.id("arrow-forward"));
    const backArrow = await driver.findElement(By.id("arrow-back"));

    const firstSlideTitle = await driver
      .findElement(By.id("slide-title"))
      .getText();

    await forwardArrow.click();

    const secondSlideTitle = await driver
      .findElement(By.id("slide-title"))
      .getText();

    assert.notDeepEqual(firstSlideTitle, secondSlideTitle);

    await backArrow.click();

    const originalTitle = await driver
      .findElement(By.id("slide-title"))
      .getText();

    assert.deepEqual(firstSlideTitle, originalTitle);
  });

  it("Should navigate to the correct page when button is clicked", async function () {
    const button = await driver.findElement(By.id("homes-button"));

    await button.click();
    const linkURL = await driver.getCurrentUrl();

    assert.strictEqual(linkURL, "http://localhost:3000/homes");
  });
});
