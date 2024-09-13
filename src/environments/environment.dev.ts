import { config } from '../config';

export const environment = {
  ...config,
  //api_url: 'https://devapi.mulstore.smatez.com/api/kosmez-portal',
  //connect_api_url: 'https://devapi.mulstore.smatez.com/api/kosmez-connect',
  // use later
  api_url: 'https://api.dev.cosmeb.com/api/kosmez-portal',
  connect_api_url: 'https://api.dev.cosmeb.com/api/kosmez-connect',
  production: true,
  firebaseConfig: {
    apiKey: 'AIzaSyB6XVpw2wTgjqu5fpwtVHL9d1RXImdo4FE',
    authDomain: 'cosmeb-dev.firebaseapp.com',
    projectId: 'cosmeb-dev',
    storageBucket: 'cosmeb-dev.appspot.com',
    messagingSenderId: '174651832740',
    appId: '1:174651832740:web:60893839f0e6c82c8f2931',
    measurementId: 'G-CMTNMSWN2L',
    vapidKey: 'BDVggftEbrJB9gzgHfsGSyiLnIkI5Bk0fU08fDClQe6igj_XLh26Zb0wAMhxAavRvSoXhViUjPU0QHjctnudkKA',
  },
};
