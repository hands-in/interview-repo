import { expect, test } from "@playwright/test";

test.describe("multicard-payments", () => {
	test.setTimeout(60000);

	test.beforeEach(async ({ page }) => {
		await page.goto(process.env["MULTICARD_TEST_URL"] ?? "");
	});

	test("should display merchant logo and name", async ({ page }) => {
		const logo = page.locator('img[alt="merchant logo"]');
		await expect(logo).toBeVisible();
		await expect(page.getByRole("heading", { name: "Demo Store" })).toBeVisible({ timeout: 10000 });
	});

	test("should show total amount", async ({ page }) => {
		await expect(page.getByRole("heading", { name: /Total: €6\.00/ })).toBeVisible();
	});

	test("should display card split options", async ({ page }) => {
		await page.waitForTimeout(10000);
		await expect(page.getByText("Select Cards")).toBeVisible();
		await expect(page.getByText("Choose how many cards you want to split the booking across")).toBeVisible({
			timeout: 10000,
		});
		await expect(page.getByRole("heading", { name: "1", level: 2 })).toBeVisible();
		await expect(page.getByRole("heading", { name: "2", level: 2 })).toBeVisible();
		await expect(page.getByRole("heading", { name: "3", level: 2 })).toBeVisible();
		await expect(page.getByRole("heading", { name: "4", level: 2 })).toBeVisible();
	});

	test("should have Pay with 2 cards button", async ({ page }) => {
		await expect(page.getByRole("button", { name: /Pay with 2 cards/ })).toBeVisible({ timeout: 10000 });
	});

	test("should display expiry chip", async ({ page }) => {
		// Select the chip with the expiry aria-label
		const expiryChip = page.locator('[aria-label^="This payment will expire on"] .MuiChip-label');
		await expect(expiryChip).toBeVisible();
	});

	test("should render correct inputs and button when selecting 2 cards", async ({ page }) => {
		test.setTimeout(120000);

		// Click the "2" card option
		await page.getByRole("heading", { name: "2", level: 2 }).click();
		await page.getByRole("button", { name: /Pay with 2 cards/ }).click();
		await page.waitForTimeout(2000);
		// Wait for the content to update
		await expect(page.getByText("You have chosen to pay with")).toBeVisible();
		await expect(page.getByText("2 cards")).toBeVisible();

		// Check for two card input fields
		const cardInputs = page.locator('input[type="text"][value="€3.00"]');
		await expect(cardInputs).toHaveCount(2);

		// Check for labels "Card 1" and "Card 2"
		await expect(page.getByLabel("Card 1")).toBeVisible();
		await expect(page.getByLabel("Card 2")).toBeVisible();

		// Check for the continue button with correct amount
		await expect(page.getByRole("button", { name: /Continue To Pay €3.00/ })).toBeVisible();
	});

	test("should render correct number of inputs for each card selection", async ({ page }) => {
		for (const n of [2, 3, 4]) {
			// Click the card option
			await page.getByRole("heading", { name: String(n), level: 2 }).click();
			await page.getByRole("button", { name: /Pay with/ }).click();

			// await page.getByRole("button", { name: `/Pay with ${n} cards/` }).click();

			await page.waitForTimeout(2000);

			// Wait for the content to update
			await expect(page.getByText("You have chosen to pay with")).toBeVisible();
			await expect(page.getByText(new RegExp(`${n} card`))).toBeVisible();

			// Check for correct number of inputs
			const cardInputs = page.locator('input[type="text"]');

			await expect(cardInputs).toHaveCount(n);

			// Check for correct labels

			await expect(page.getByLabel(`Card ${n}`)).toBeVisible();

			const amount = await page.getByLabel(`Card ${n}`).inputValue();

			await expect(page.getByRole("button", { name: `Continue To Pay ${amount}` })).toBeVisible();

			// Click the arrow back button to return to card selection
			await page.locator('button:has([data-testid="ArrowBackIcon"])').click();
		}
	});
});

test.describe("Payment Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(process.env["MULTICARD_TEST_URL"] ?? "");

		// Example: 2 cards
		await page.getByRole("heading", { name: "2", level: 2 }).click();
		await page.getByRole("button", { name: /Pay with 2 cards/ }).click();
		await page.waitForTimeout(2000);
		// Wait for the content to update
		await expect(page.getByText("You have chosen to pay with")).toBeVisible();
		await expect(page.getByText("2 cards")).toBeVisible();

		// Check for two card input fields
		const cardInputs = page.locator('input[type="text"][value="€3.00"]');
		await expect(cardInputs).toHaveCount(2);

		// Check for labels "Card 1" and "Card 2"
		await expect(page.getByLabel("Card 1")).toBeVisible();
		await expect(page.getByLabel("Card 2")).toBeVisible();

		// Check for the continue button with correct amount
		await page.getByRole("button", { name: /Continue To Pay €3.00/ }).click();

		await page.waitForTimeout(2000);
	});

	test("renders correct number of cards based on query param", async ({ page }) => {
		// Count all card sections using the CreditCardIcon
		const cardIcons = page.locator('[data-testid="CreditCardIcon"]');
		await expect(cardIcons).toHaveCount(2);

		// Assert labels or texts for both cards
		await expect(page.getByText("Card 1")).toBeVisible();
		await expect(page.getByText("Card 2")).toBeVisible();

		// Assert amount text
		await expect(page.getByText("€3.00")).toHaveCount(2);
	});

	test("renders SecureFields card input if numberOfCards is 0 or missing", async ({ page }) => {
		// default or numberOfCards=0

		// Card Number iframe should be present
		const cardNumberIframe = page.frameLocator('iframe[name*="cardNumber"]');
		await expect(cardNumberIframe.locator("body")).toBeVisible();

		// Expiry input field (outside iframe)
		const expiryInput = page.locator('input[name="expiry"]');
		await expect(expiryInput).toBeVisible();

		// CVV iframe should be present
		const cvvIframe = page.frameLocator('iframe[name*="cvv"]');
		await expect(cvvIframe.locator("body")).toBeVisible();
	});

	test("renders back button and allows click", async ({ page }) => {
		// Click the back button via its data-testid
		const backButton = page.locator('button:has([data-testid="ArrowBackIcon"])');
		await expect(backButton).toBeVisible();
		await backButton.click();
	});
});
