const chrome = require("selenium-webdriver/chrome");
const { assert } = require("chai");
const { Builder, By, until } = require("selenium-webdriver");
const path = require("path");
const fs = require("fs");

const myoptions = new chrome.Options()
  .headless()
  .addArguments("disable-gpu", "--window-size=2560,1440");
const TIMEOUT = 10000;
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

describe("Selenium Tests for NavBar", function () {
  it("Should be able to navigate to the Marketplace Page using the Buy Link", async function () {
    await driver.get("http://localhost:3000/");

    const buyButton = await driver.findElement(By.id("buyButton"));

    await buyButton.click();
    assert.strictEqual(
      "http://localhost:3000/marketplace",
      await driver.getCurrentUrl()
    );
  });

  it("Should be able to navigate to the Marketplace Page using the Rent Link", async function () {
    await driver.get("http://localhost:3000/");

    const rentButton = await driver.findElement(By.linkText("Rent"));

    await rentButton.click();
    assert.strictEqual(
      "http://localhost:3000/marketplace",
      await driver.getCurrentUrl()
    );
  });

  it("Should be display island links when user hovers over islands button", async function () {
    await driver.get("http://localhost:3000/");

    const islandsLinks = await driver.findElements(
      By.className("dropdownLink")
    );

    assert.strictEqual(islandsLinks.length, 8);

    for (let i = 0; i < islandsLinks.length; i++) {
      assert.isFalse(await islandsLinks[i].isDisplayed());
    }

    const islandsButton = await driver.findElement(
      By.xpath('//button[text()="Islands"]')
    );

    const actions = driver.actions({ async: true });
    await actions.move({ origin: islandsButton }).perform();

    for (let i = 0; i < islandsLinks.length; i++) {
      assert.isTrue(await islandsLinks[i].isDisplayed());
    }
  });

  it("Should be navigate to islands page when island link is clicked", async function () {
    await driver.get("http://localhost:3000/");

    const islandsButton = await driver.findElement(
      By.xpath('//button[text()="Islands"]')
    );

    const actions = driver.actions({ async: true });
    await actions.move({ origin: islandsButton }).perform();

    const islandsLink = await driver.findElement(By.className("dropdownLink"));
    await islandsLink.click();
    assert.strictEqual(
      "http://localhost:3000/islands",
      await driver.getCurrentUrl()
    );
  });

  it("Should be able to navigate to the About us Page using the About Link", async function () {
    await driver.get("http://localhost:3000/");

    await driver.findElement(By.linkText("About")).click();

    assert.strictEqual(
      "http://localhost:3000/aboutUs",
      await driver.getCurrentUrl()
    );
  });

  it("Should be able to navigate to the Contact Page using the Contact Link", async function () {
    await driver.get("http://localhost:3000/");

    await driver.findElement(By.linkText("Contact")).click();

    assert.strictEqual(
      "http://localhost:3000/contact",
      await driver.getCurrentUrl()
    );
  });

  it("Should be able to navigate to the Sign Up Page using the Sign Up Link", async function () {
    await driver.get("http://localhost:3000/");

    await driver.findElement(By.linkText("Sign Up")).click();

    assert.strictEqual(
      "http://localhost:3000/signUp",
      await driver.getCurrentUrl()
    );
  });

  it("Should be able to navigate to the Login Page using the Login Link", async function () {
    await driver.get("http://localhost:3000/");

    await driver.findElement(By.linkText("Log in")).click();

    assert.strictEqual(
      "http://localhost:3000/login",
      await driver.getCurrentUrl()
    );
  });

  it("Should be able to navigate to the Home Page by clicking the logo", async function () {
    await driver.get("http://localhost:3000/aboutUs");

    await driver
      .findElement(By.xpath('//*[@class="brandLogoDiv"]/a[1]'))
      .click();

    assert.strictEqual("http://localhost:3000/", await driver.getCurrentUrl());
  });
});

describe("Selenium Tests for Hero page", function () {
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

    const snapshotPath = path.join(
      __dirname,
      "../../assets/snapshots/HomePage-snapshot.html"
    );
    const htmlSource = await driver.getPageSource();
    fs.writeFile(snapshotPath, htmlSource, { flag: "wx" }, function (err) {
      if (err && err.code !== "EEXIST") throw err;
      console.log("Saved!");
    });
  });
});

describe("Selenium Tests for Footer", function () {
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

  it("Should load the footer component", async function () {
    await driver.get("http://localhost:3000/");

    const footerHeading = await driver
      .findElement(By.id("footer-heading"))
      .getText();
    assert.strictEqual(footerHeading, "Contact Us");
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

  describe("Selenium Tests for Islands grid", function () {
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
  });
});
