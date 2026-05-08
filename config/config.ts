export const config = {
  baseUrl: process.env.BASE_URL || 'https://sharemdev.netlify.app',
  apiBaseUrl: process.env.API_BASE_URL || 'https://api.sharemdev.netlify.app',
  timeout: 30000,
  navigationTimeout: 30000,
  retries: 2,
};

export const testData = {
  validRoom: {
    name: 'Test Room',
    description: 'Automation Test Room',
  },
  participants: {
    host: { name: 'Host User', role: 'host' },
    guest: { name: 'Guest User', role: 'guest' },
  },
};