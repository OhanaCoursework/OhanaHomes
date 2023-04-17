const chrome = require("selenium-webdriver/chrome");
const { assert } = require("chai");
const { Builder, By } = require("selenium-webdriver");

const myoptions = new chrome.Options()
  .headless()
  .addArguments("disable-gpu", "--window-size=2560,1440");
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
      "http://localhost:3000/contactUs",
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
