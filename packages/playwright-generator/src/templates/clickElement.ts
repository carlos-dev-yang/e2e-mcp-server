export const clickElementTemplate = (selector: string) => `
  await page.click('${selector}');
`;
