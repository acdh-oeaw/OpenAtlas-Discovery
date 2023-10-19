// Import discovery config
import discoveryConfig from "../../config/discoveryConfig.json";

describe("Navigation", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("Main to Map", () => {
		if (discoveryConfig.APIbase === undefined) {
			cy.task("log", "APIbase is undefined, skipping test");
			return;
		}

		cy.get('[data-test="main-map-btn"]').should("exist").click();

		cy.get('[data-test="map-page-container"]').should("exist");
	});

	it("Main to Data", () => {
		if (discoveryConfig.APIbase === undefined) {
			cy.task("log", "APIbase is undefined, skipping test");
			
		} else {
			cy.get('[data-test="main-data-btn"]').should("exist").click();

			cy.get('[data-test="data-page-container"]').should("exist");
		}
	});

	it("Successive Nav Clicks", () => {
		if (discoveryConfig.APIbase === undefined) {
			cy.task("log", "APIbase is undefined, skipping test");
			
		} else {
			cy.get('[data-test="main-map-btn"]').should("exist").dblclick();

			cy.get('[data-test="map-page-container"]').should("exist");
		}
	});
});
