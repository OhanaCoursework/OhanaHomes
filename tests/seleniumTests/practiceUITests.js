const { assert } = require("chai");
var fs = require("fs");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const { Builder } = require("selenium-webdriver");

const screen = {
  width: 640,
  height: 480
};

let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().headless().windowSize(screen))
    .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
    .build();

async function example(){

        await driver.get("http://google.com");
             
        var title = await driver.getTitle();
        assert.strictEqual(title, "Google");
        
        var htmlSource = await driver.getPageSource();
        fs.appendFile("src/assets/snapshots/google-snapshot.html", htmlSource, function (err) {
          if (err) throw err;
          console.log("Saved!");
        });
 
        //It is always a safe practice to quit the browser after execution
        await driver.quit();


}

example();