import { test, expect } from '@playwright/test';

// TODO: APIとの繋ぎこみをどうするか検討してから作り込む(mock? test環境? stagingなどの検証環境?)
test.describe('/sign_up', () => {
	test('【正常系】確認画面に遷移できる', async ({ page }) => {
		await page.goto('/sign_up');

		await page
			.getByPlaceholder('例) test@example.com')
			.fill('test5@example.com');
		await page.getByPlaceholder('8文字以上20文字以内').fill('password');
		await page.getByRole('button').click();

		await page.waitForURL('http://localhost:3001/sign_up/confirm');
		await expect(page).toHaveURL('http://localhost:3001/sign_up/confirm');
		// await page.screenshot({
		// 	fullPage: true,
		// 	path: './tests/example_test/aaa.png',
		// });
	});

	test('【正常系】確認画面から入力画面に戻ることができる', async ({ page }) => {
		await page.goto('/sign_up');

		// フォームへの入力・送信
		await page
			.getByPlaceholder('例) test@example.com')
			.fill('test5@example.com');
		await page.getByPlaceholder('8文字以上20文字以内').fill('password');
		await page.getByRole('button').click();
		await page.waitForURL('http://localhost:3001/sign_up/confirm');

		// 入力画面に戻るとフォームに入力内容が埋まっていることの確認
		await page.getByRole('button', { name: '戻る' }).click();

		await page.waitForURL('http://localhost:3001/sign_up');
		await page.screenshot({
			fullPage: true,
			path: './tests/exsample_test/confirm.png',
		});
		await expect(page.getByPlaceholder('例) test@example.com')).toHaveValue(
			'test5@example.com',
		);
		await expect(page.getByPlaceholder('8文字以上20文字以内')).toHaveValue(
			'password',
		);
	});

	test('【正常系】確認画面から入力画面に戻り、入力内容を更新できる', async ({
		page,
	}) => {
		await page.goto('/sign_up');

		// フォームへの入力・送信
		await page
			.getByPlaceholder('例) test@example.com')
			.fill('test5@example.com');
		await page.getByPlaceholder('8文字以上20文字以内').fill('password');
		await page.getByRole('button').click();

		// 確認画面へ遷移、入力画面に戻る
		await page.waitForURL('http://localhost:3001/sign_up/confirm');
		await page.getByRole('button', { name: '戻る' }).click();
		await page.waitForURL('http://localhost:3001/sign_up');

		// 修正して再び確認画面へ遷移できることの確認;
		await page
			.getByPlaceholder('例) test@example.com')
			.fill('test_modify@example.com');
		await page.getByRole('button').click();
		await page.waitForURL('http://localhost:3001/sign_up/confirm');
		await page.screenshot({
			fullPage: true,
			path: './tests/exsample_test/confirm.png',
		});
		await expect(page).toHaveURL('http://localhost:3001/sign_up/confirm');
		await expect(page.getByText('test_modify@example.com')).toBeVisible();
		await expect(page.getByRole('button', { name: '登録する' })).toBeVisible();
	});

	test('【正常系】入力→確認→サンクスの遷移ができる', async ({ page }) => {
		await page.goto('/sign_up');

		// フォームへの入力・送信
		await page
			.getByPlaceholder('例) test@example.com')
			.fill('test5@example.com');
		await page.getByPlaceholder('8文字以上20文字以内').fill('password');
		await page.getByRole('button').click();
		await page.waitForURL('http://localhost:3001/sign_up/confirm');

		await page.getByRole('button', { name: '登録する' }).click();

		await page.waitForURL('http://localhost:3001/sign_up/thanks');
		await page.screenshot({
			fullPage: true,
			path: './tests/exsample_test/confirm.png',
		});
		await expect(page.getByText('会員登録が完了しました。')).toBeVisible();
	});

	// test('【異常系】バリデーションエラーがある場合は入力画面でエラーメッセージが表示されること', async ({
	// 	page,
	// }) => {
	// 	//
	// });
});
