const { assert } = require("chai");
const { Builder } = require("selenium-webdriver");
var fs = require("fs");

 
async function example(){
  
       let driver = await new Builder().forBrowser("chrome").build();
 
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