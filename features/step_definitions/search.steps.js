const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement, getText } = require("../../lib/commands.js");

Before(async function () {
    const browser = await puppeteer.launch({ headless: true, slowMo: 50 });
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;
  });
  
  After(async function () {
    if (this.browser) {
      await this.browser.close();
    }
  });
  
  Given("user is on {string} page", async function (string) {
    return await this.page.goto(`http://qamid.tmweb.ru${string}`, {
      setTimeout: 20000,
    });
  });
  
  When("user click {string}", async function (string) {
    return await clickElement(this.page, string);
  });
  
  Then("user sees {string}", async function (string) {
    const actual = await getText(this.page, "h2.ticket__check-title");
    const expected = await string;
    expect(actual).contains(expected);
  });

  Then("user can't click", async function () {
    const position = "body > main > section:nth-child(1) > div:nth-child(2) > ul > li > a";
  expect(() =>
    clickElement(page, position).toThrowError(
      "Selector is not clickable: ${position}"
    )
  );
  })