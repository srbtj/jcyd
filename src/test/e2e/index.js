const {Builder, By, Key, until} = require('selenium-webdriver');

(async function test () {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('https://www.baidu.com/');
    await driver.findElement(By.name('wd')).sendKeys('javascript学习指南', Key.RETURN);
    await driver.wait(until.titleIs('javascript学习指南', 1000));
  } finally {
    await driver.quit();
  }
})();
