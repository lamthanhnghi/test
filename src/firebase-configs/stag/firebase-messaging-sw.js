importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyCx9W88xFUhpq54Y7aOqxNavZqek3f3r2k',
  authDomain: 'cosmeb-stag.firebaseapp.com',
  projectId: 'cosmeb-stag',
  storageBucket: 'cosmeb-stag.appspot.com',
  messagingSenderId: '216853545183',
  appId: '1:216853545183:web:7d3c192bc1d2c10cc4696a',
  measurementId: 'G-XS124F8784',
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
