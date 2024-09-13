importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyB6XVpw2wTgjqu5fpwtVHL9d1RXImdo4FE',
  authDomain: 'cosmeb-dev.firebaseapp.com',
  projectId: 'cosmeb-dev',
  storageBucket: 'cosmeb-dev.appspot.com',
  messagingSenderId: '174651832740',
  appId: '1:174651832740:web:60893839f0e6c82c8f2931',
  measurementId: 'G-CMTNMSWN2L',
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
