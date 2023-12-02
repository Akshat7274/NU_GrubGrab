import { Builder, By, Key } from "selenium-webdriver"

async function tester(){
    let browser = await new Builder().forBrowser('chrome').build();
    await browser.get('https://www.google.com/')
    await browser.findElement(By.xpath("/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]")).sendKeys("test this",Key.RETURN)
    await browser.quit()
}

tester()