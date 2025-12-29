import { test, expect } from '@playwright/test';

test('should be able to get all posts', async ({ request }) => {
  // Make a GET request to the /booking endpoint (assuming a baseURL is set in the config)
  const response = await request.get('https://jsonplaceholder.typicode.com/posts');
  // Assert that the response status is OK (200-299 range)
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Parse the JSON response body
  const responseBody = await response.json();

  // Assert on the content of the response body
  expect(responseBody).toBeInstanceOf(Array);
  expect(responseBody.length).toBeGreaterThan(0);
});