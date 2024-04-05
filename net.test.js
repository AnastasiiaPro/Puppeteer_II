const { clickElement, getText } = require("./lib/commands.js");
const puppeteer = require('puppeteer');

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Application test `Let's go to the cinema`", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://qamid.tmweb.ru/client/index.php");
    await clickElement(page, "body > nav > a:nth-child(2)"); 
  });

  test ("Reservation of free space for tomorrow's first session", async () => {    
    await clickElement(
      page,
      "body > main > section:nth-child(1) > div:nth-child(2) > ul > li:nth-child(1)"
    );
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(1) > span:nth-child(1)"
    ); 
    await clickElement(page, "body > main > section > button");

    const bookingTickets = "Вы выбрали билеты:";
    const actualBookingTickets = await getText(
      page,
      "body > main > section > header > h2"
    );
    expect(actualBookingTickets).toContain(bookingTickets);
  });

  test("Бронирование VIP места на завтра первый сеанс", async () => {    
    await clickElement(
      page,
      "body > main > section:nth-child(1) > div:nth-child(2) > ul > li:nth-child(1)"
    ); 
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(4) > span.buying-scheme__chair.buying-scheme__chair_vip"
    ); 
    await clickElement(page, "body > main > section > button");

 
    const bookingTickets = "Вы выбрали билеты:";
    const actualBookingTickets = await getText(
      page,
      "body > main > section > header > h2"
    );
    expect(actualBookingTickets).toContain(bookingTickets);
  });
});

test("Нельзя купить билет на прошедший сеанс", async () => {
  const position = "body > main > section:nth-child(1) > div:nth-child(2) > ul > li > a";
  expect(() =>
    clickElement(page, position).toThrowError(
      "Selector is not clickable: ${position}"
    )
  );
});