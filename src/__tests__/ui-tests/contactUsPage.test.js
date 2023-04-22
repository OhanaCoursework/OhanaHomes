const { assert } = require("chai");
const fs = require("fs");
const path = require("path");
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
  it("Should be able to navigate to the Contact Us Us Page from the Hero Section", async function () {
    // Navigate to the home page
    await driver.get("http://localhost:3000/");
    await driver.manage().window().setRect({ width: 1401, height: 800 });
    await driver.findElement(By.xpath("/html/body/div[1]/div/nav/div[2]/ul/li[5]/a")).click();

    const pageTitle = await driver.findElement(By.id("PageHeading")).getText();
    assert.strictEqual(pageTitle, "Contact Us");

    const snapshotPath = path.join(
      __dirname,
      "../../assets/snapshots/ContactUsPage-snapshot.html"
    );
    const htmlSource = await driver.getPageSource();
    fs.writeFile(snapshotPath, htmlSource, { flag: "wx" }, function (err) {
      if (err && err.code !== "EEXIST") throw err;
    });
  });
});
