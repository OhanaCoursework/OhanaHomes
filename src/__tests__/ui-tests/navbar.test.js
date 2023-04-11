const chrome = require("selenium-webdriver/chrome");
const { Builder, By } = require("selenium-webdriver");

const myoptions = new chrome.Options().headless().addArguments("disable-gpu");
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

        await driver.findElement(By.xpath("//*[@id='buyButton']"));
    });
  });
  