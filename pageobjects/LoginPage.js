class LoginPage {

constructor(page, options = {})
{
    this.page = page;
    this.loginUrl = options.loginUrl || "https://rahulshettyacademy.com/client";
    this.userName = page.locator(options.userNameSelector || "#userEmail");
    this.password = page.locator(options.passwordSelector || "#userPassword");
    this.signInbutton = page.locator(options.signInSelector || "[value='Login']");
    this.terms = options.termsSelector ? page.locator(options.termsSelector) : null;
    this.waitForNetworkIdle = options.waitForNetworkIdle !== false;
}

async goTo()
{
    await this.page.goto(this.loginUrl);
}

async validLogin(username, password)
{
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInbutton.click();

    if (this.waitForNetworkIdle) {
        await this.page.waitForLoadState('networkidle');
    }
}

async loginWithTerms(username, password)
{
    await this.userName.fill(username);
    await this.password.fill(password);

    if (this.terms) {
        await this.terms.check();
    }

    await this.signInbutton.click();
}

}
module.exports = {LoginPage};