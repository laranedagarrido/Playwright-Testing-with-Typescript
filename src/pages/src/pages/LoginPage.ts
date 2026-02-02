import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  private usernameInput = '#user';
  private passwordInput = '#password';
  private submitButton = 'button[type="submit"]';

  async goto() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitButton);
  }

  async shouldBeLoggedIn() {
    await expect(this.page).toHaveURL(/dashboard/);
  }
}