import { parseGherkin } from 'gherkin-parser';
import { interpretTestStep, TestStep } from 'mcp-integration';
import { messages } from '@cucumber/messages';
import { loginTemplate, clickElementTemplate } from './templates';

/**
 * Gherkin 시나리오와 해석된 단계를 기반으로 Playwright 테스트 코드를 생성합니다.
 * @param gherkinContent Gherkin 시나리오 내용
 * @param browserType 생성할 테스트 코드의 브라우저 타입 (예: 'chromium', 'firefox', 'webkit')
 * @returns 생성된 Playwright 테스트 코드
 */
export async function generatePlaywrightTest(
  gherkinContent: string,
  browserType: 'chromium' | 'firefox' | 'webkit' = 'chromium'
): Promise<string> {
  try {
    const gherkinDocument: messages.GherkinDocument = parseGherkin(gherkinContent);
    let testCode = `import { test, expect } from '@playwright/test';\n\n`;

    // 브라우저 설정 추가
    testCode += `test.use({ browserName: '${browserType}' });\n\n`;

    if (!gherkinDocument.feature) {
      throw new Error('Gherkin content must contain a Feature.');
    }

    for (const featureChild of gherkinDocument.feature.children || []) {
      if (featureChild.scenario) {
        const scenario = featureChild.scenario;
        testCode += `test('${scenario.name}', async ({ page }) => {\n`;

        for (const step of scenario.steps) {
          const testStep: TestStep = {
            type: step.keyword.trim() as TestStep['type'],
            text: step.text,
          };
          const interpreted = await interpretTestStep(testStep);

          switch (interpreted.action) {
            case 'navigate':
              testCode += `  await page.goto('${interpreted.value}');\n`;
              break;
            case 'type':
              testCode += `  await page.fill('${interpreted.selector}', '${interpreted.value}');\n`;
              break;
            case 'click':
              testCode += `  ${clickElementTemplate(interpreted.selector || '')}\n`;
              break;
            case 'login':
              testCode += `  ${loginTemplate}\n`;
              break;
            case 'unknown':
              testCode += `  // TODO: Implement action for: ${interpreted.value}\n`;
              break;
            default:
              testCode += `  // Unhandled action: ${interpreted.action}\n`;
          }
        }
        testCode += `});\n\n`;
      }
    }

    return testCode;
  } catch (error: any) {
    console.error('Error during Playwright test generation:', error.message);
    throw new Error(`Failed to generate Playwright test code: ${error.message}`);
  }
}

// 예시 사용법 (개발용)
if (require.main === module) {
  async function runExample() {
    const exampleGherkin = `\nFeature: User Login\n  Scenario: Successful Login\n    Given I navigate to "https://example.com"\n    When I enter username "testuser" and password "password123"\n    And I click the "Login" button\n    Then I should be redirected to the dashboard\n    `;

    try {
      // Chromium 브라우저용 테스트 코드 생성
      const generatedCodeChromium = await generatePlaywrightTest(exampleGherkin, 'chromium');
      console.log('Generated Playwright Test Code (Chromium):\n', generatedCodeChromium);

      // Firefox 브라우저용 테스트 코드 생성
      const generatedCodeFirefox = await generatePlaywrightTest(exampleGherkin, 'firefox');
      console.log('Generated Playwright Test Code (Firefox):\n', generatedCodeFirefox);

      // 잘못된 Gherkin 내용으로 오류 테스트
      const invalidGherkin = `Invalid Gherkin content`;
      await generatePlaywrightTest(invalidGherkin);
    } catch (error) {
      console.error('Error in example run:', error);
    }
  }
  runExample();
}
