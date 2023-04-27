const chrome = require("selenium-webdriver/chrome");
const { assert } = require("chai");
const { Builder, By, until, Key } = require("selenium-webdriver");
const path = require("path");
const fs = require("fs");

const myoptions = new chrome.Options()
  .headless()
  .addArguments("disable-gpu", "--window-size=2560,1440");
const TIMEOUT = 20000;
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

  if(linkText === 'Home') {
    return '';
  }
  return href;
}

describe("Selenium Tests for account menus", function () {
  it("Should be able to navigate to the Sign Up pop up using the Sign Up Link", async function () {
    await driver.get("http://localhost:3000/");

    assert.isFalse(
      await driver.findElement(By.id("signUpCloseButton")).isDisplayed()
    );

    await driver.findElement(By.id("outerSignUpButton")).click();

    await driver.sleep(1000);

    assert.isTrue(
      await driver.findElement(By.id("signUpCloseButton")).isDisplayed()
    );
  });

  it("Should be able to navigate to the Login pop up using the Login Link", async function () {
    await driver.get("http://localhost:3000/");

    assert.isFalse(
      await driver.findElement(By.id("loginCloseButton")).isDisplayed()
    );

    await driver.findElement(By.id("outerLoginButton")).click();
    await driver.sleep(1000);

    assert.isTrue(
      await driver.findElement(By.id("loginCloseButton")).isDisplayed()
    );
  });

  it("Should be able to close to the Login pop up using the close button", async function () {
    await driver.findElement(By.id("loginCloseButton")).click();
    await driver.sleep(1000);

    assert.isFalse(
      await driver.findElement(By.id("loginCloseButton")).isDisplayed()
    );
  });

  it("Should be able to close to the sign up pop up using the close button", async function () {
    await driver.get("http://localhost:3000/");

    await driver.findElement(By.id("outerSignUpButton")).click();
    await driver.sleep(1000);

    assert.isTrue(
      await driver.findElement(By.id("signUpCloseButton")).isDisplayed()
    );

    await driver.findElement(By.id("signUpCloseButton")).click();
    await driver.sleep(1000);

    assert.isFalse(
      await driver.findElement(By.id("signUpCloseButton")).isDisplayed()
    );
  });
});

describe("Selenium Tests for NavBar", function () {
  it("Should be able to navigate to the Marketplace Page using the Buy Link", async function () {
    await driver.get("http://localhost:3000/");

    const buyButton = await driver.findElement(By.id("buyButton"));

    await buyButton.click();
    assert.strictEqual(
      "http://localhost:3000/marketplace?type=buy",
      await driver.getCurrentUrl()
    );
  });

  it("Should be able to navigate to the Marketplace Page using the Rent Link", async function () {
    await driver.get("http://localhost:3000/");

    const rentButton = await driver.findElement(By.linkText("Rent"));

    await rentButton.click();
    assert.strictEqual(
      await driver.getCurrentUrl(),
      "http://localhost:3000/marketplace?type=rent",
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

  it("Should be navigate to correct islands page when island link is clicked", async function () {
    await driver.get("http://localhost:3000/");

    const islandsLink = await driver.findElements(By.className("dropdownLink"));

    for (let i = 0; i < islandsLink.length; i++) {
      const islandsButton = await driver.findElement(
        By.xpath('//button[text()="Islands"]')
      );

      const actions = driver.actions({ async: true });
      await actions.move({ origin: islandsButton }).perform();
      const freshLinks = await driver.findElements(
        By.className("dropdownLink")
      ); // Re-find the elements

      const linkText = await freshLinks[i].getText(); // Get the link text before clicking on it

      const href = generateHref(linkText); // Extract href from link text

      await freshLinks[i].click();
      await driver.sleep(2000);
      await driver.wait(until.stalenessOf(freshLinks[i])); // Wait for the old link to be removed from the DOM
      const linkURL = await driver.getCurrentUrl();
      await driver.navigate().back();
      const expectedUrl = `http://localhost:3000/${href}`;
      assert.strictEqual(decodeURIComponent(linkURL), expectedUrl);
    }
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

  it("Should be able to create an account and log in", async function () {
    await driver.get("http://localhost:3000/");

    await driver.findElement(By.id("outerSignUpButton")).click();

    await driver.findElement(By.id("signUpUsername")).sendKeys("username123");
    await driver.findElement(By.id("signUpPassword")).sendKeys("Password123!");

    await driver.findElement(By.id("signup-submit")).click();

    await driver.findElement(By.id("outerLoginButton")).click();

    await driver.findElement(By.id("loginUsername")).sendKeys("username123");
    await driver.findElement(By.id("loginPassword")).sendKeys("Password123!");

    await driver.findElement(By.id("login-submit")).click();
    assert.strictEqual(
      "My Account",
      await driver.findElement(By.id("accountBtn")).getText()
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
    await driver.sleep(11000);
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
    driver.sleep(3000);
    const linkURL = await driver.getCurrentUrl();

    assert.strictEqual(linkURL, "http://localhost:3000/marketplace");

    const snapshotPath = path.join(
      __dirname,
      "../../assets/snapshots/HomePage-snapshot.html"
    );
    const htmlSource = await driver.getPageSource();
    fs.writeFile(snapshotPath, htmlSource, { flag: "wx" }, function (err) {
      if (err && err.code !== "EEXIST") throw err;
    });
  });
});

describe("FeaturedProperties Component", function () {
  it("should display 4 house items in a grid with 4 columns on larger screens", async function () {
    await driver.get("http://localhost:3000/");
    // Set the window size to 1400px to trigger the updateItemsPerPage effect
    await driver.manage().window().setRect({ width: 1401, height: 800 });

    // Wait for the page to fully load
    await driver.wait(until.elementLocated(By.className("houseList")));

    // Get the number of house items displayed on the page
    const houseItems = await driver.findElements(By.className("houseItem"));

    // Assert that the number of house items displayed is equal to the itemsPerPage state (3)
    assert.strictEqual(houseItems.length, 4);
  });

  it("should display 3 house items in a grid with 3 columns on larger screens", async function () {
    await driver.get("http://localhost:3000/");
    // Set the window size to 1400px to trigger the updateItemsPerPage effect
    await driver.manage().window().setRect({ width: 1300, height: 800 });

    // Wait for the page to fully load
    await driver.wait(until.elementLocated(By.className("houseList")));

    // Get the number of house items displayed on the page
    const houseItems = await driver.findElements(By.className("houseItem"));

    // Assert that the number of house items displayed is equal to the itemsPerPage state (3)
    assert.strictEqual(houseItems.length, 3);
  });

  it("should display 2 house items in a grid with 2 columns on smaller screens", async function () {
    await driver.get("http://localhost:3000/");
    // Set the window size to 600px width to trigger the media query for smaller screens
    await driver.manage().window().setRect({ width: 800, height: 800 });

    // Wait for the page to fully load
    await driver.wait(until.elementLocated(By.className("houseList")));

    // Get the number of house items displayed on the page
    const houseItems = await driver.findElements(By.className("houseItem"));

    // Assert that the number of house items displayed is equal to 2
    assert.strictEqual(houseItems.length, 2);
  });

  it("should display 1 house item in a grid with 1 column on extra small screens", async function () {
    await driver.get("http://localhost:3000/");
    // Set the window size to 400px width to trigger the media query for extra small screens
    await driver.manage().window().setRect({ width: 400, height: 800 });

    // Wait for the page to fully load
    await driver.wait(until.elementLocated(By.className("houseList")));
    // get the house items displayed on the page after clicking the forward button
    const houseItems = await driver.findElements(By.className("houseItem"));

    // Assert that the number of house items displayed is equal to the expected number (4)
    assert.strictEqual(houseItems.length, 1);
  });

  it("should navigate to the previous page when the back button is clicked", async function () {
    await driver.get("http://localhost:3000/");
    await driver.manage().window().setRect({ width: 1401, height: 800 });
    // Wait for the page to fully load
    await driver.wait(until.elementLocated(By.className("houseList")));

    await driver.sleep(3000);

    // Click the forward button to navigate to the next page
    await driver.findElement(By.id("forwardBtn")).click();

    // Click the back button
    await driver.findElement(By.id("backBtn")).click();
    await driver.sleep(3000);

    // Wait for the page to fully load after clicking the back button
    await driver.wait(until.elementLocated(By.className("houseList")));

    // Get the house items displayed on the page after clicking the back button
    const houseItems = await driver.findElements(By.className("houseItem"));

    // Assert that the number of house items displayed is equal to the expected number (4)
    assert.strictEqual(houseItems.length, 4);

    const firstHouseItem = await driver.findElement(By.className("houseItem"));
    const firstHouseItemText = await firstHouseItem.getText();
    assert.strictEqual(
      firstHouseItemText,
      "Luxury Villa, Hawaii\n£4,100,000"
    );
  });

  it("should navigate to the next page when the forward button is clicked", async function () {
    await driver.get("http://localhost:3000/");
    // Wait for the page to fully load
    await driver.wait(until.elementLocated(By.className("houseList")));

    // Click the forward button
    await driver.findElement(By.id("forwardBtn")).click();
    await driver.sleep(3000);

    // Wait for the page to fully load after clicking the forward button
    await driver.wait(until.elementLocated(By.className("houseList")));

    // Get the house items displayed on the page after clicking the forward button
    const houseItems = await driver.findElements(By.className("houseItem"));

    // Assert that the number of house items displayed is equal to the expected number (4)
    assert.strictEqual(houseItems.length, 4);

    const firstHouseItem = await driver.findElement(By.className("houseItem"));

    const firstHouseItemText = await firstHouseItem.getText();
    assert.strictEqual(
      firstHouseItemText,
      "House in Big Island, Hawaii\n£6,480,000"
    );
  });

  it("Should navigate to the correct page when button is clicked", async function () {
    const button = await driver.findElement(By.id("btn"));

    await button.click();
    driver.sleep(3000);
    const linkURL = await driver.getCurrentUrl();

    assert.strictEqual(linkURL, "http://localhost:3000/marketplace");
  });
});

describe("Selenium Tests for Islands grid", function () {
  it("Should display 8 islands", async function () {
    await driver.get("http://localhost:3000/");

    const islandCards = await driver.findElements(By.className("islandCard"));

    assert.equal(islandCards.length, 8);
  });

  it("Should navigate to islands page when an island card is clicked", async function () {
    const islandText = await driver
      .findElement(By.className("islandName"))
      .getText();

    const href = islandText.toLowerCase();

    await driver.findElement(By.className("islandCard")).click();

    assert.strictEqual(
      `http://localhost:3000/${href}`,
      await driver.getCurrentUrl()
    );
  });
});

describe("Selenium Tests for Footer", function () {
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
});

describe("Selenium Tests for homepage search bar", function () {
  it("Should go to buy marketplace page when user searches using the search bar and user has clicked the buy button", async function () {
    await driver.get("http://localhost:3000/");
    await driver.sleep(1000);
    const searchBar = await driver.findElement(By.id("homePageSearchInput"));
    const buyButton = await driver.findElement(By.id("buySearchButton"));
    await buyButton.click();

    await searchBar.sendKeys("east maui");
    await searchBar.sendKeys(Key.ENTER);

    assert.strictEqual(
      await driver.getCurrentUrl(),
      "http://localhost:3000/marketplace?type=buy&searchQuery=east+maui"
    );
  });

  it("Should go to rent marketplace page when user searches using the search bar and user has clicked the rent button", async function () {
    await driver.get("http://localhost:3000/");
    await driver.sleep(1000);
    const searchBar = await driver.findElement(By.id("homePageSearchInput"));
    const rentButton = await driver.findElement(By.id("rentSearchButton"));

    await rentButton.click();

    await searchBar.sendKeys("east maui");
    await searchBar.sendKeys(Key.ENTER);

    assert.strictEqual(
      await driver.getCurrentUrl(),
      "http://localhost:3000/marketplace?type=rent&searchQuery=east+maui"
    );
  });
});
