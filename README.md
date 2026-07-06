# QaOpsPlaywright

Playwright automation suite with local and Azure Playwright Testing support.

## Running tests locally

```bash
# Run all tests (local browsers)
npm run regression

# Run only @Mada-tagged tests
npm run MadaTests

# Run only @API-tagged tests
npm run APITests

# Run Safari tests with alternate config
npm run SafariNewConfig

# Run Cucumber/BDD tests
npm run CucumberRegression
```

## Running tests on Azure Playwright Testing

Azure tests use `playwright.service.config.js`, which routes execution through the Azure Playwright Testing cloud service.

### Required secrets / environment variables

| Variable | Description |
|---|---|
| `PLAYWRIGHT_SERVICE_URL` | The endpoint URL of your Azure Playwright Testing workspace. Found in the Azure portal under your workspace → Settings → General. |
| `AZURE_CLIENT_ID` | Client ID of the Azure service principal or managed identity used to authenticate. |
| `AZURE_TENANT_ID` | Tenant ID of the Azure AD directory. |
| `AZURE_CLIENT_SECRET` | Client secret of the Azure service principal (omit when using managed identity). |

Set these as [GitHub repository secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions) before triggering the Azure workflow.

### Run Azure tests locally

Export the variables above in your shell, then:

```bash
npm run AzureTests
```

### Run Azure tests in CI

Go to **Actions → Playwright Tests (Azure) → Run workflow** in GitHub. The workflow is triggered manually (`workflow_dispatch`) so it won't run on every push.

## Configuration files

| File | Purpose |
|---|---|
| `playwright.config.js` | Default local config (chromium, headless) |
| `playwright1.config.js` | Alternate local config (multi-browser projects) |
| `playwright.service.config.js` | Azure Playwright Testing config — extends the local config and adds the Azure service layer and reporter |

## Allure reporting

```bash
npm run allure:generate   # generate report from allure-results/
npm run allure:open       # open the generated report in a browser
```
