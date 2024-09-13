import { config } from '../config';

export const environment = {
  ...config,
  api_url: 'https://api.staging.cosmeb.com/api/kosmez-portal',
  connect_api_url: 'https://api.staging.cosmeb.com/api/kosmez-connect',
  production: true,
  firebaseConfig: {
    apiKey: 'AIzaSyCx9W88xFUhpq54Y7aOqxNavZqek3f3r2k',
    authDomain: 'cosmeb-stag.firebaseapp.com',
    projectId: 'cosmeb-stag',
    storageBucket: 'cosmeb-stag.appspot.com',
    messagingSenderId: '216853545183',
    appId: '1:216853545183:web:7d3c192bc1d2c10cc4696a',
    measurementId: 'G-XS124F8784',
    vapidKey: 'BCXcNMUHPoBf1kquyaxq9Xxwx1RUwWKR1lmG_8XMXl0F2CH89MQ9YmENW0BdQ8oC-DDFCxCOaCO415tL84okdi4',
  },
};
