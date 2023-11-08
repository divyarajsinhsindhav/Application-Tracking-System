const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCMBFKIpxJuKOCI3lXjNsAWwp812KO7QtU",
    authDomain: "ats-ssip.firebaseapp.com",
    projectId: "ats-ssip",
    storageBucket: "ats-ssip.appspot.com",
    messagingSenderId: "80295731528",
    appId: "1:80295731528:web:65a002c86d765c952f537d",
    measurementId: "G-SLPQCTTJ5D"
  });

const citizenDB = firebaseApp.firestore()
const jillaPanchayatDB = firebaseApp.firestore()
const atsDB = firebaseApp.firestore()
citizenDB.settings({ timestampInSnapshot: true })
const auth = firebaseApp.auth();
