const { assert } = require("chai");
var fs = require("fs");
const chrome = require("selenium-webdriver/chrome");
const { Builder, By } = require("selenium-webdriver");
let myoptions = new chrome.Options();
myoptions.headless();
myoptions.addArguments("disable-gpu");
let TIMEOUT=6000;

describe("Selenium Tests for About Us Page", function () {
  it("Should be able to navigate to the About us Page from the Hero Section", async function () {
    let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(myoptions)
    .build();

    await driver
    .manage()
    .setTimeouts({ implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT });
    console.info(await driver.manage().getTimeouts());

    // Navigate to the home page
    await driver.get("http://localhost:3000/");

    await driver.findElement(By.xpath("//a")).click();

    const pageTitle = await driver.findElement(By.xpath("//h1[@id='PageHeading']")).getText();
    assert.strictEqual(pageTitle, "About Us");


    var htmlSource = await driver.getPageSource();
    fs.appendFile(
      "src/assets/snapshots/AboutUs-snapshot.html",
      htmlSource,
      function (err) {
        if (err) throw err;
        console.log("Saved!");
      }
    );

    await driver.quit();
  });
});
