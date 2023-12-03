import assert from "assert";
import { Builder, By, Key } from "selenium-webdriver";

async function tester() {
  let browser = await new Builder().forBrowser("chrome").build();
  await browser.get("http://localhost:3000");
  await browser
    .findElement(
      By.xpath("/html/body/div/div/main/div[2]/div/div[2]/div/div/div[1]/a")
    )
    .click();
  let item = await browser
    .findElement(
      By.xpath(
        "/html/body/div/div/div/main/div[2]/div[2]/div[1]/div[1]/div/div[1]/h5[1]"
      )
    )
    .getText()
    .then(function (value) {
      return value;
    });
  assert.strictEqual(item, "Contc. Pizza Large");
  await browser.quit();
}

tester();
