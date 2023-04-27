const chrome = require("selenium-webdriver/chrome");
const { assert } = require("chai");
const { Builder, By, Key } = require("selenium-webdriver");

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

describe("Selenium Tests for marketplace page", function () {
  it("Should correctly search properties", async function () {
    await driver.get("http://localhost:3000/marketplace?type=buy");
    const searchBar = await driver.findElement(By.id("marketplaceSearchInput"));

    await searchBar.sendKeys("east maui");
    await searchBar.sendKeys(Key.ENTER);

    const showProperties = await driver.findElements(
      By.className("detailedHouseItem")
    );

    assert.strictEqual(showProperties.length, 4);
  });

  it("Should correctly filter properties by island", async function () {
    await driver.get("http://localhost:3000/marketplace?type=buy");
    const searchBar = await driver.findElement(By.id("marketplaceSearchInput"));

    await searchBar.sendKeys("villa");
    await searchBar.sendKeys(Key.ENTER);

    const intialShownProperties = await driver.findElements(
      By.className("detailedHouseItem")
    );

    assert.strictEqual(intialShownProperties.length, 4);

    const islandsFilter = await driver.findElement(
      By.id("propertiesFilterIslands")
    );

    await islandsFilter.findElement(By.css("option[value='maui']")).click();

    const showProperties = await driver.findElements(
      By.className("detailedHouseItem")
    );

    assert.strictEqual(showProperties.length, 2);
  });

  it("Should correctly filter for rent properties by min price", async function () {
    await driver.get("http://localhost:3000/marketplace?type=rent");
    await driver.sleep(1000);
    const searchBar = await driver.findElement(By.id("marketplaceSearchInput"));

    await searchBar.sendKeys("villa");
    await searchBar.sendKeys(Key.ENTER);

    const intialShownProperties = await driver.findElements(
      By.className("detailedHouseItem")
    );

    assert.strictEqual(intialShownProperties.length, 4);

    const minPriceFilter = await driver.findElement(
      By.id("propertiesFilterMinPrice")
    );

    await minPriceFilter.findElement(By.css("option[value='6000']")).click();

    const showProperties = await driver.findElements(
      By.className("detailedHouseItem")
    );

    assert.strictEqual(showProperties.length, 1);
  });

  it("Should correctly filter for buy properties by min price", async function () {
    await driver.get("http://localhost:3000/marketplace?type=buy");
    await driver.sleep(1000);
    const searchBar = await driver.findElement(By.id("marketplaceSearchInput"));

    await searchBar.sendKeys("villa");
    await searchBar.sendKeys(Key.ENTER);

    const intialShownProperties = await driver.findElements(
      By.className("detailedHouseItem")
    );

    assert.strictEqual(intialShownProperties.length, 4);

    const minPriceFilter = await driver.findElement(
      By.id("propertiesFilterMinPrice")
    );

    await minPriceFilter.findElement(By.css("option[value='5000000']")).click();

    const showProperties = await driver.findElements(
      By.className("detailedHouseItem")
    );

    assert.strictEqual(showProperties.length, 2);
  });

  it("Should correctly filter rent properties by max price", async function () {
    await driver.get("http://localhost:3000/marketplace?type=rent");
    const searchBar = await driver.findElement(By.id("marketplaceSearchInput"));

    await searchBar.sendKeys("villa");
    await searchBar.sendKeys(Key.ENTER);

    const intialShownProperties = await driver.findElements(
      By.className("detailedHouseItem")
    );

    assert.strictEqual(intialShownProperties.length, 4);

    const maxPriceFilter = await driver.findElement(
      By.id("propertiesFilterMaxPrice")
    );

    await maxPriceFilter.findElement(By.css("option[value='5000']")).click();

    const showProperties = await driver.findElements(
      By.className("detailedHouseItem")
    );

    assert.strictEqual(showProperties.length, 2);
  });

  it("Should correctly filter buy properties by max price", async function () {
    await driver.get("http://localhost:3000/marketplace?type=buy");
    const searchBar = await driver.findElement(By.id("marketplaceSearchInput"));

    await searchBar.sendKeys("villa");
    await searchBar.sendKeys(Key.ENTER);

    const intialShownProperties = await driver.findElements(
      By.className("detailedHouseItem")
    );

    assert.strictEqual(intialShownProperties.length, 4);

    const maxPriceFilter = await driver.findElement(
      By.id("propertiesFilterMaxPrice")
    );

    await maxPriceFilter.findElement(By.css("option[value='5000000']")).click();

    const showProperties = await driver.findElements(
      By.className("detailedHouseItem")
    );

    assert.strictEqual(showProperties.length, 2);
  });

  it("Should correctly filter properties by number of bedrooms", async function () {
    await driver.get("http://localhost:3000/marketplace?type=buy");
    const searchBar = await driver.findElement(By.id("marketplaceSearchInput"));

    await searchBar.sendKeys("villa");
    await searchBar.sendKeys(Key.ENTER);

    const intialShownProperties = await driver.findElements(
      By.className("detailedHouseItem")
    );

    assert.strictEqual(intialShownProperties.length, 4);

    const bedsFilter = await driver.findElement(By.id("propertiesFilterBeds"));

    await bedsFilter.findElement(By.css("option[value='4']")).click();

    const showProperties = await driver.findElements(
      By.className("detailedHouseItem")
    );

    assert.strictEqual(showProperties.length, 2);
  });

  it("Should correctly filter properties by number of bathrooms", async function () {
    await driver.get("http://localhost:3000/marketplace?type=buy");
    const searchBar = await driver.findElement(By.id("marketplaceSearchInput"));

    await searchBar.sendKeys("villa");
    await searchBar.sendKeys(Key.ENTER);

    const intialShownProperties = await driver.findElements(
      By.className("detailedHouseItem")
    );

    assert.strictEqual(intialShownProperties.length, 4);

    const bathsFilter = await driver.findElement(
      By.id("propertiesFilterBaths")
    );

    await bathsFilter.findElement(By.css("option[value='3']")).click();

    const showProperties = await driver.findElements(
      By.className("detailedHouseItem")
    );

    assert.strictEqual(showProperties.length, 1);
  });

  it("Should correctly filter properties by move in date", async function () {
    await driver.get("http://localhost:3000/marketplace?type=buy");
    const searchBar = await driver.findElement(By.id("marketplaceSearchInput"));

    await searchBar.sendKeys("villa");
    await searchBar.sendKeys(Key.ENTER);

    const intialShownProperties = await driver.findElements(
      By.className("detailedHouseItem")
    );

    assert.strictEqual(intialShownProperties.length, 4);

    const moveInDateFilter = await driver.findElement(
      By.id("propertiesFilterMoveInDate")
    );

    await moveInDateFilter.sendKeys("03/06/2023");

    const showProperties = await driver.findElements(
      By.className("detailedHouseItem")
    );

    assert.strictEqual(showProperties.length, 2);
  });
});
