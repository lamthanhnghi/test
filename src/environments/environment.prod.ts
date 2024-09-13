import { config } from '../config';

export const environment = {
  ...config,
  api_url: 'https://devapi.mulstore.smatez.com/api/kosmez-portal',
  connect_api_url: 'https://devapi.mulstore.smatez.com/api/kosmez-connect',
  production: true,
  firebaseConfig: {
    apiKey: 'AIzaSyBINuJc-gIxgSoWSqCaJEphDlKwv-cmtiM',
    authDomain: 'cosmeb-4458f.firebaseapp.com',
    projectId: 'cosmeb-4458f',
    storageBucket: 'cosmeb-4458f.appspot.com',
    messagingSenderId: '288631391147',
    appId: '1:288631391147:web:c563b57e36820e3c50c8ee',
    measurementId: 'G-C6TBSG0D4G',
    vapidKey: 'BNArV17LPi8WkS-LagNaAsG_Q8AQ2Mi8yz8tZgZRFx77AazW1dSdNaer7MCh5ZXn7mvK96JRL0SUGeaUdxelfkU',
  },
};
