const { assert } = require("chai");
const chrome = require("selenium-webdriver/chrome");
const { Builder, By } = require("selenium-webdriver");

const myoptions = new chrome.Options();
myoptions.addArguments("disable-gpu", "--window-size=2560,1440");
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
    await driver.get("http://localhost:3000/");

    await driver.findElement(By.className("islandCard")).click();

    assert.strictEqual(
      "http://localhost:3000/islands",
      await driver.getCurrentUrl()
    );
  });

  it("Should display view homes button when user hovers over island card", async function () {

    jest.setTimeout(150000);

    await driver.get("http://localhost:3000/");

    const dropdown = await driver.findElement(
      By.className("dropdown")
    );

    const viewHomesButton = await driver.findElement(
      By.className("buttonDiv")
    );

    console.log("first op: " + await viewHomesButton.getCssValue("opacity"));

    await driver.takeScreenshot().then(
      function(image) {
          require('fs').writeFileSync("../../../capturedimage.1.png", image, 'base64');
      }
    );

    const actions = await driver.actions({ async: true });
    await actions.move({ origin: dropdown }).perform();

    await driver.sleep(1000);

    await driver.takeScreenshot().then(
      function(image) {
          require('fs').writeFileSync("../../../capturedimage.2.png", image, 'base64');
      }
    );

    console.log("second op: " + await viewHomesButton.getCssValue("opacity"));

    console.log("third op: " + await viewHomesButton.getCssValue("opacity"));

    await driver.takeScreenshot().then(
      function(image) {
          require('fs').writeFileSync("../../../capturedimage.3.png", image, 'base64');
      }
    );

    const islandsTitle = await driver.findElement(
      By.id("footer-heading")
    );

    await actions.move({ origin: islandsTitle }).perform();

    await driver.sleep(1000);

    console.log("4 op: " + await viewHomesButton.getCssValue("opacity"));

    await driver.takeScreenshot().then(
      function(image) {
          require('fs').writeFileSync("../../../capturedimage.4.png", image, 'base64');
      }
    );

    const islandCard = await driver.findElement(By.className("islandCard"));

    await actions.move({ origin: islandCard }).perform();

    await driver.sleep(1000);

    console.log("5 op: " + await viewHomesButton.getCssValue("opacity"));

    await driver.takeScreenshot().then(
      function(image) {
          require('fs').writeFileSync("../../../capturedimage.5.png", image, 'base64');
      }
    );

    assert.isTrue(await viewHomesButton.isDisplayed());
  });
});
