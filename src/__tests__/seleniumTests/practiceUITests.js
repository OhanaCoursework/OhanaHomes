const { assert } = require("chai");
var fs = require("fs");
const chrome = require("selenium-webdriver/chrome");
const { By, Builder } = require("selenium-webdriver");
let TIMEOUT = 60000;
let myoptions = new chrome.Options();
myoptions.addArguments("--window-size=2560,1440")
myoptions.headless();
myoptions.addArguments("disable-gpu");

let driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(myoptions)
  .build();

async function example() {
  await driver
    .manage()
    .setTimeouts({ implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT });
  console.info(await driver.manage().getTimeouts());

  await driver.get("http://localhost:3000/");

  let logInButton = await driver.findElement(By.className("loginBtn"));

  assert.isTrue(await logInButton.isDisplayed());

  var htmlSource = await driver.getPageSource();
  fs.appendFile(
    "src/assets/snapshots/google-snapshot.html",
    htmlSource,
    function (err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );

  //It is always a safe practice to quit the browser after execution
  await driver.quit();
}

example();
