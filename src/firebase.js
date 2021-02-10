import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyBhvD2mMPGElkby6Em7jH-ZlO43dz5WrUc',
	authDomain: 'netflix-clone-ebf41.firebaseapp.com',
	projectId: 'netflix-clone-ebf41',
	storageBucket: 'netflix-clone-ebf41.appspot.com',
	messagingSenderId: '696165064854',
	appId: '1:696165064854:web:76fef6e1f2dfb855ade2b7',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
