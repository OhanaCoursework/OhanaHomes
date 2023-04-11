const { assert } = require("chai");
const fs = require("fs");
const path = require("path");
const chrome = require("selenium-webdriver/chrome");
const { Builder, By, until } = require("selenium-webdriver");

const myoptions = new chrome.Options();
myoptions.addArguments("disable-gpu");
myoptions.headless();

const TIMEOUT = 10000;

function generateHref(linkText) {
  const spaceIndex = linkText.indexOf(" ");
  let href = linkText;
  if (spaceIndex !== -1) {
    href =
      linkText.substring(0, spaceIndex).toLowerCase() +
      linkText.substring(spaceIndex).replace(/\s+/g, "");
  } else {
    href = linkText.toLowerCase();
  }
  return href;
}

describe("Selenium Tests for Footer", function () {
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

  it("Should load the footer component", async function () {
    await driver.get("http://localhost:3000/");

    const footerHeading = await driver
      .findElement(By.id("footer-heading"))
      .getText();
    assert.strictEqual(footerHeading, "Contact Us");

    const snapshotPath = path.join(
      __dirname,
      "../../assets/snapshots/HomePage-snapshot.html"
    );
    const htmlSource = await driver.getPageSource();
    fs.writeFile(snapshotPath, htmlSource, { flag: "wx" }, function (err) {
      if (err && err.code !== "EEXIST") throw err;
    });
  });

  it("Should navigate to the correct page when footer links are clicked", async function () {
    const links = await driver.findElements(By.css(".Link"));

    for (let i = 0; i < links.length; i++) {
      const freshLinks = await driver.findElements(By.css(".Link")); // Re-find the elements
      const linkText = await freshLinks[i].getText(); // Get the link text before clicking on it

      const href = generateHref(linkText); // Extract href from link text

      await freshLinks[i].click();
      await driver.wait(until.stalenessOf(freshLinks[i])); // Wait for the old link to be removed from the DOM
      const linkURL = await driver.getCurrentUrl();
      await driver.navigate().back();
      await driver.sleep(2000);
      const expectedUrl = `http://localhost:3000/${href}`;
      assert.strictEqual(linkURL, expectedUrl);
    }
  });

  it("Should display social media icons in the footer", async function () {
    const socialMediaIcons = await driver.findElements(By.css(".icons"));
    for (let i = 0; i < socialMediaIcons.length; i++) {
      const displayProperty = await socialMediaIcons[i].getCssValue("display");
      assert.strictEqual(displayProperty, "block");
    }
  });
});
