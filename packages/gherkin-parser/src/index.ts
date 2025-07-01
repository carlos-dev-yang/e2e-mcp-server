import { parse } from '@cucumber/gherkin';
import { messages } from '@cucumber/messages';

export function parseGherkin(gherkinContent: string): messages.GherkinDocument {
  const gherkinDocument = parse(gherkinContent);
  return gherkinDocument;
}

// 예시 사용법 (개발용)
if (require.main === module) {
  const exampleGherkin = `
Feature: User Login
  As a user
  I want to log in
  So that I can access my account

  Scenario: Successful Login
    Given I am on the login page
    When I enter username "testuser" and password "password123"
    And I click the "Login" button
    Then I should be redirected to the dashboard
  `;

  try {
    const parsed = parseGherkin(exampleGherkin);
    console.log('Parsed Gherkin Document:', JSON.stringify(parsed, null, 2));
  } catch (error) {
    console.error('Error parsing Gherkin:', error);
  }
}
