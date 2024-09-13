importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyBINuJc-gIxgSoWSqCaJEphDlKwv-cmtiM',
  authDomain: 'cosmeb-4458f.firebaseapp.com',
  projectId: 'cosmeb-4458f',
  storageBucket: 'cosmeb-4458f.appspot.com',
  messagingSenderId: '288631391147',
  appId: '1:288631391147:web:c563b57e36820e3c50c8ee',
  measurementId: 'G-C6TBSG0D4G',
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
