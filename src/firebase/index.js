import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCIesfW7b2f0v86apNm5KpO_cjv96r-V48",
    authDomain: "dizcuzz-58fe0.firebaseapp.com",
    databaseURL: "https://dizcuzz-58fe0.firebaseio.com",
    projectId: "dizcuzz-58fe0",
    storageBucket: "dizcuzz-58fe0.appspot.com",
    messagingSenderId: "104892412686",
    appId: "1:104892412686:web:76e11c0aef8c00f3ffdd5f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Getting instance of firebase auth && firestore
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut()

// Creating a user
export const createUserDocument = async (user, additionalData) => {
    if (!user) {
        return
    }

    const userRef = firestore.doc(`users/${user.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { email } = user;
        const createdAt = new Date();

        try {
            await userRef.set({
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    return userRef;
};


export default firebase;