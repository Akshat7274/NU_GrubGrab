import { Builder, By, Key} from "selenium-webdriver"

async function tester(){
    let browser = await new Builder().forBrowser('chrome').build();
    await browser.get('https://www.bing.com/')
    await browser.findElement(By.id("sb_form_q")).sendKeys("test this",Key.RETURN)
    await browser.quit()
}

tester()