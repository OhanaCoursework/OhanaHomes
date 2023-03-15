const assert = require('assert');
const { Builder, By, until } = require('selenium-webdriver');
import "@testing-library/jest-dom"
const { cssSelector } = require('')

describe('Selenium Tests for About Us Page', function () {
  let driver;

  beforeEach(async function () {
    // Set up the WebDriver instance
    driver = await new Builder()
      .forBrowser('chrome')
      .build();
  });

  afterEach(async function () {
    // Quit the browser after each test
    await driver.quit();
  });

  it('Should be able to navigate to the About us Page from the Hero Section', async function () {
    // Navigate to the home page
    await driver.get('http://localhost:3000/');

    // Click the 'About Us' link
    await driver.findElement(By.xpath('//a')).click();

    // Assert that the page title is correct
    const pageTitle = await driver.findElement(By.xpath("//h1[@id='PageHeading']")).getText()
    assert.strictEqual(pageTitle, "About Us");
  });
});
