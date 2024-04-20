import { test, expect } from '@playwright/test';

test.describe('/profiles', () => {
	test('【プロフィール編集画面が開けること】', async ({ page }) => {
		await page.goto('/sign_in');

		// フォームへの入力・送信
		await page.getByPlaceholder('Email').fill('test@example.com');
		await page.getByPlaceholder('Password').fill('password');
		await page.getByRole('button').click();
		await page.waitForURL('http://localhost:3001/todos');

		await page.goto('/profiles');
		await expect(page.getByLabel('直近の開発実績')).toHaveValue(
			'ECサイトの開発',
		);
	});
});
