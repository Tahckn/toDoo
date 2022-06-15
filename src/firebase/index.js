import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAW7HK3bE7npIMcG5IcQ-mGnMGk_9Bl3A0',
  authDomain: 'todo-app-vue-94dab.firebaseapp.com',
  projectId: 'todo-app-vue-94dab',
  storageBucket: 'todo-app-vue-94dab.appspot.com',
  messagingSenderId: '493198286693',
  appId: '1:493198286693:web:20c670748d87ea1ef30b8c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}