const assert = require('assert');
const test = require('selenium-webdriver/testing');
const webdriver = require('selenium-webdriver');
const { By, until } = require('selenium-webdriver');
require('chromedriver');

let browser;

test.describe('Report components', function() {
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

    test.it('See week 1 report', function(done) {
        // Check correct title
        browser.getTitle().then(function(title) {
            assert.equal(title, 'me-react-app jsramverk');
        });

        // Click dropdown menu
        browser
            .findElement(By.id('basic-nav-dropdown'))
            .then(function(element) {
                element.click();
            });

        // Go into week 1 report
        browser
            .findElement(By.xpath('//*[@href = "/reports/week/1"]'))
            .then(function(element) {
                element.click();
            });

        done();
    });

    test.it('Login and see create report component', function(done) {
        // Check correct title
        browser.getTitle().then(function(title) {
            assert.equal(title, 'me-react-app jsramverk');
        });

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

        // So reports link can load after login
        browser.wait(
            until.elementLocated(By.xpath('//*[contains(text(), "Logout")]')),
            5000,
        );

        // Click dropdown menu
        browser
            .findElement(By.id('basic-nav-dropdown'))
            .then(function(element) {
                element.click();
            });

        // Go into create report
        browser
            .findElement(By.xpath('//*[@href = "/reports"]'))
            .then(function(element) {
                element.click();
            });

        done();
    });
});
