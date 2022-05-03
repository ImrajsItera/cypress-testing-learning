/// <reference types="cypress" />

/*
1.	Otvor url https://365.bank/
2.	Akceptuj Cookies
3.	Prejdi na hypotekarnu kalkulacku
4.	Nastav hodnotu nehnutelnosti, vysku hypoteky,dlzku splatnosti a dlzku fixacie
5.	Zaskrtni EKO zvyhodnenie
6.	Otestuj ci sa zobrazi odhadovana splatka a aj urokova sadzba ako vysledok nastavenia kroku 4
7.	Klikni na ”Idem do toho” 
8.	Over ci ta to odnavygovalo na https://365.bank/mam-zaujem/hypoteka

*/

describe("ZADANIA", () => {
  describe.skip("365 Bank", () => {
    beforeEach(() => {
      cy.intercept(
        "GET",
        "https://365.bank/api/content/by-url?fetchUrl=//&fetchHost=365.bank"
      ).as("contentFetch");
      cy.intercept("GET", "https://365.bank/api/exchangeRate/getRates").as(
        "getRates"
      );
      cy.visit("/");
      cy.wait("@getRates");
      cy.wait("@contentFetch");
    });

    before("Import test data", () => {
      cy.fixture("hypo").then((data) => {
        globalThis.data = data;
      });
    });

    it("Zadanie c.1 - Hypotekarny Uver 365.bank", () => {
      cy.get("#e0bbky1wzpth1").should("not.exist");

      cy.get(".btn-mint.mr-15.cursor-pointer", { timeout: 7000 })
        .should("have.text", "Akceptovať všetky cookies")
        .click()
        .should("not.exist");

      //cy.contains("div", "Vypočítaj si");
      //cy.get(".floatingPanelLinkCalculator").click();

      cy.get('div > a[href="/kalkulacky/"] > div')
        .filter(`:contains("Vypočítaj si")`)
        .click()
        .url()
        .should("include", "/kalkulacky");

      cy.get('a[href*="hypotekarna-kalkulacka"]')
        .click()
        .url()
        .should("include", "/hypotekarna-kalkulacka");

      cy.get("input[name=estateValueInput]")
        .clear()
        .type(data.hodnotaNehnutelnosti)
        .should("have.value", data.hodnotaNehnutelnosti);
      cy.get("input[name=mortgageValueInput]")
        .clear()
        .type(data.vyskaHypoteky)
        .should("have.value", data.vyskaHypoteky);
      cy.get("input[name=durationInput]")
        .clear()
        .type(data.splatnost)
        .should("have.value", data.splatnost);
      cy.get("clc-radio .radio-3__title")
        .contains(data.fixacia)
        .parent()
        .click({ force: true })
        .should("have.css", "background-color", "rgb(69, 219, 204)");
      cy.get("input[name=ecoType]").check({ force: true }).should("be.checked");

      cy.get(".title-28")
        .invoke("text")
        .then(parseFloat)
        .should("eq", data.vysledokOdhadovanaSplatka);

      cy.get(".font-14.pb-10.price_addition")
        .children()
        .invoke("text")
        .then(parseFloat)
        .should("eq", data.vysledokPercento);

      cy.get('a[href="/mam-zaujem/hypoteka/"]')
        .click()
        .url()
        .should("include", "/mam-zaujem/hypoteka");
    });
  });

  describe("ABOUT YOU", () => {
    /*
    1.	Navstiv stranku aboutyou.sk (accept cookiees a podobne 🙂 
    2.	Vyber si lubolovne dva produkty (je jedno ci pre muza alebo zenu) 
    3.	Ak sa Da vyber farbu a velkost
    4.	Pridaj do kosa
    5.	Prejdi do kosa a checkni ci su tam tvoje dva itemy a ci maju spravnu velkost a farbu (ak boli dostupne pri vybere) 
    6.	Over ci je tam predpokladany datum dodania. 
    7.	Over celkovu sumu v kosiku
    
    Dodatocny test
    1.	skontroluj ci ta to dobre odnavigovalo na stranku
    2.	Skontroluj ci su dostupna cena pri vyrobku (aj pri vybere vyrobku aj pri uz vybratom vyrobku)
    3.	Pridaj Dalsi item do kosa a jeden zo starsich itemov vymaz - otestuj ci sa vymazal
    4.	Over po tretom kroku celkovu sumu v kosiku 🙂 
    */
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    beforeEach(() => {
      cy.clearLocalStorage();
      cy.clearCookies();
      // Inject cookie to bypass Accept Cookies banner
      cy.setCookie("OptanonAlertBoxClosed", "2022-05-02T21:40:42.542Z");
      cy.visit("https://www.aboutyou.sk/");
      // .get("#onetrust-accept-btn-handler")
      // .click();
    });

    before("Import test data", () => {
      cy.fixture("aboutyou").then((data) => {
        globalThis.data = data;
      });
    });

    it("Zadanie c.2 - About You shopping tryout1", () => {
      // Navigate to Clothing section
      cy.get("[data-test-id=Header_navigation_list_item_Oblečenie]")
        .click()
        .url("include", "/oblecenie");

      // Get list of all rendered products
      cy.get("[data-testid^=productTileTracker-]")
        .parent()
        .then((clothesList) => {
          // Filter list of products and get those with color=black & size=M
          cy.wrap(clothesList)
            .find(`[data-testid="ColorBubble-simple-${data.color}"]`)
            .closest("[data-testid^=productTileTracker-]")
            .find("[data-testid='Sizes']")
            .filter(':contains("M")')
            .closest("[data-testid^=productTileTracker-]")
            .as("clothesListFiltered");
          cy.get("@clothesListFiltered").then((filteredList) => {
            cy.log(`Filtered products count: ${filteredList.length}`);
            cy.wrap(filteredList);
          });
        });
    });

    it.only("Zadanie c.2 - About You shopping tryout2", () => {
      // Navigate to Clothing section
      cy.get("[data-test-id=Header_navigation_list_item_Oblečenie]")
        .click()
        .url("include", "/oblecenie");

      // Select size=M as filter
      cy.get("[data-testid='filterDropdownSizeGrouped']")
        .as("sizeDropdown")
        .click()
        .get("[data-testid='sizeRunCluster-Oblečenie']")
        .find("button[data-testid^=filterSize_]")
        .contains(data.size)
        .should("have.css", "border", "2px solid rgb(242, 242, 242)")
        .click()
        .should("have.css", "border", "2px solid rgb(0, 0, 0)")
        .wait(2000)
        .get("@sizeDropdown")
        .click()
        .find("[data-testid='numberBadge']")
        .should("contain", 1);

      // Select color=black as filter
      cy.get("[data-testid='filterDropdownColor']")
        .as("colorDropdown")
        .click()
        .get("[data-testid='filterDropdownSectionColor']")
        .find(
          `[data-testid^="filterFlyoutColorCheckbox"][color="${data.color}"]`
        )
        .children("input")
        .check()
        .should("be.checked")
        .get("@colorDropdown")
        .click()
        .find("[data-testid='numberBadge']")
        .should("contain", 1);

      // Get list of all rendered products
      cy.get("[data-testid^=productTileTracker-]").as("products");
      const regex = new RegExp(`M|38`, "g");
      // Select product and add it to cart
      for (let i = 0; i < data.productsAmountToAdd; i++) {
        cy.get("@products").eq(i).click().url("include", "/oblecenie");
        cy.get("[data-testid=sizeFlyoutOpener]").click();
        cy.get("[data-testid=sectionEnd]")
          .first()
          .then((section) =>
            section.text().includes("sizeOptionList")
              ? cy.get("[data-testid=sizeOptionList]")
              : cy.get("[data-testid=sizeList]")
          )

          //.get("[data-testid=sizeOptionList]")
          .find("[data-testid=optionContentLabel]")
          .contains(regex)
          .click();

        cy.get("[data-testid=addToBasketButton]")
          .click()
          //.wait(1000)
          // .get("[data-testid=Button]")
          // .click()
          .get("[data-testid=backButton_navigation]")
          .click();
      }
    });
  });
});
