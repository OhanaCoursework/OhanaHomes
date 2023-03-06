const { assert } = require("chai");
var fs = require("fs");
const chrome = require("selenium-webdriver/chrome");
const { Builder } = require("selenium-webdriver");

let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().headless())
    .build();

driver.manage().timeouts().implicitlyWait(10000);

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