const assert = require('assert');
const test = require('selenium-webdriver/testing');
require('chromedriver');
const webdriver = require('selenium-webdriver');
const By = require('selenium-webdriver').By;
const until = require('selenium-webdriver').until;

let browser;

test.describe('Login and Logout components', function() {
    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder()
            .forBrowser('chrome')
            .build();

        browser.get('https://ml-jsramverk.me/');
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });
    test.it('User login and logout', function(done) {
        // Go into login
        browser
            .findElement(By.xpath('//*[@href = "/login"]'))
            .then(function(element) {
                element.click();
            });

        browser
            .findElement(By.id('email'))
            .then(function(element) {
                element.sendKeys('test@test.com');
            });

        browser
            .findElement(By.id('password'))
            .then(function(element) {
                element.sendKeys('test');
                element.submit();
            });

        // So logout button can load after login
        browser.wait(
            until.elementLocated(By.xpath('//*[contains(text(), "Logout")]')),
            5000,
        );

        browser
            .findElement(By.xpath('//*[contains(text(), "Logout")]'))
            .then(function(element) {
                element.click();
            });

        browser.wait(
            until.elementLocated(By.xpath('//*[@href = "/login"]')),
            5000,
        );

        done();
    });
});
