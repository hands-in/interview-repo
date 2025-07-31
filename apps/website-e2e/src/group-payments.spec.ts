import { expect, test } from "@playwright/test";

test.describe("group-payment-ui", () => {
	test.setTimeout(60000);

	test.beforeEach(async ({ page }) => {
		await page.goto(process.env["GROUP_TEST_URL"] ?? "");
		await page.waitForSelector("img");
	});

	test("should show group payment modal with title and avatars", async ({ page }) => {
		// Check for the modal heading
		await expect(page.getByText("Pay as a Group")).toBeVisible();

		// Check for the member count
		await expect(page.getByText(/2 Members/)).toBeVisible();

		await expect(page.getByText(/1 Joined • 0 Paid/)).toBeVisible();
	});

	test("should show progress bar and 0% completion text", async ({ page }) => {
		const progressBar = page.locator('[role="progressbar"]');
		await expect(progressBar).toHaveAttribute("aria-valuenow", "5");
		await expect(page.getByText("0% complete")).toBeVisible();
	});

	test("should render Pick Items To Pay For button", async ({ page }) => {
		const pickItemsButton = page.getByRole("button", { name: "Pick Items To Pay For" });

		const pickItemButtonCount = await pickItemsButton.count();

		if (pickItemButtonCount !== 0) {
			await pickItemsButton.waitFor({ state: "visible" });
			await expect(pickItemsButton).toBeVisible();
			await expect(pickItemsButton).toBeEnabled();
		}
	});

	test("should interact with Group Members drawer", async ({ page }) => {
		const cardButtons = page.locator("button.MuiCardActionArea-root");

		// Find the one that contains "2 Members" text inside
		const memberCard = cardButtons.filter({
			has: page.locator("p", { hasText: "2 Members" }),
		});

		await expect(memberCard).toBeVisible();

		await memberCard.click();

		// Wait for the drawer to appear
		const drawer = page.locator('div[class*="MuiDrawer-paperAnchorBottom"]').filter({
			hasText: "Group members", // Or some known unique text inside that drawer
		});
		await expect(drawer).toBeVisible();

		// Check titles
		await expect(drawer.getByRole("heading", { name: "Group members" })).toBeVisible();
		await expect(drawer.getByText(/Manage, remind or even pay/i)).toBeVisible();

		// Click "Add member"
		await drawer.getByRole("button", { name: "Add member" }).click();

		// Fill in search input
		const searchInput = drawer.getByPlaceholder("Search by name");
		await searchInput.fill("Vasu");
	});
});

test.describe("when clicking on Pick Items To Pay For Drawer", () => {
	test.setTimeout(60000);
	test.beforeEach(async ({ page }, testInfo) => {
		await page.goto(process.env["GROUP_TEST_URL"] ?? "", { timeout: 60000 });

		await page.waitForSelector("img");

		const payButton = page.getByRole("button", { name: "Pick Items To Pay For" });
		const payBtnCount = await payButton.count();

		if (payBtnCount !== 0) {
			await payButton.waitFor({ state: "visible" });
			await expect(page.getByRole("button", { name: "Pick Items To Pay For" })).toBeVisible();
			await page.getByRole("button", { name: "Pick Items To Pay For" }).click();
		} else {
			await page.waitForTimeout(2000);
			await expect(page.getByRole("button", { name: "Add Your Card Details" })).toBeVisible();
			await page.getByRole("button", { name: "Add Your Card Details" }).click();
		}
	});

	test("should have disabled submit button initially", async ({ page }) => {
		const submitBtn = page.getByRole("button", { name: "Pick an item to pay for" });
		const submitBtnCount = await submitBtn.count();

		if (submitBtnCount !== 0) {
			await expect(submitBtn).toBeDisabled();
		}
	});

	test("should select quantity and click Continue to pay", async ({ page }) => {
		// Wait for Quantity select to be visible

		const addItemButton = page.getByRole("button", { name: "Add Item" });
		const addItemBtnCount = await addItemButton.count();

		if (addItemBtnCount === 0) {
			await page.waitForTimeout(10000);

			// Wait for the Alert
			const alert = page.getByRole("alert");
			await expect(alert).toBeVisible();
			await expect(alert).toHaveText(/you'll only be charged when everyone else has contributed/i);

			// Locate iframe inside the BridgerPay container
			const iframeLocator = page.frameLocator("iframe.bp-checkout-iframe");

			// Ensure iframe exists and is visible
			const iframeElement = page.locator("iframe.bp-checkout-iframe");

			await expect(iframeLocator.owner()).toBeVisible();

			// Optional: validate iframe `src` contains correct parameters
			const src = await iframeElement.getAttribute("src");
			expect(src).toContain("cashierKey=68871ce4-dc4f-43a2-a316-da83933b3140");
		} else {
			await addItemButton.click();
			await page.waitForTimeout(500);

			const quantitySelect = page.locator('select[class*="MuiNativeSelect-select"]');

			await expect(quantitySelect).toBeVisible();

			// const quantitySelect = page.getByLabel("Quantity");
			await expect(quantitySelect).toBeVisible();

			// Select quantity 1
			await quantitySelect.selectOption("1");

			// Verify selection worked
			await expect(quantitySelect).toHaveValue("1");

			// Wait for and click "Continue to pay €253.38" button
			const continueButton = page.getByRole("button", {
				name: /Continue to pay €253.38/i,
			});

			await expect(continueButton).toBeVisible();
			await continueButton.click();

			// test for bridgerpay iframe render

			await page.waitForTimeout(10000);

			// Wait for the Alert
			const alert = page.getByRole("alert");
			await expect(alert).toBeVisible();
			await expect(alert).toHaveText(/you'll only be charged when everyone else has contributed/i);

			// Locate iframe inside the BridgerPay container
			const iframeLocator = page.frameLocator("iframe.bp-checkout-iframe");

			// Ensure iframe exists and is visible
			const iframeElement = page.locator("iframe.bp-checkout-iframe");

			await expect(iframeLocator.owner()).toBeVisible();

			// Optional: validate iframe `src` contains correct parameters
			const src = await iframeElement.getAttribute("src");
			expect(src).toContain("cashierKey=68871ce4-dc4f-43a2-a316-da83933b3140");
		}
	});
});
