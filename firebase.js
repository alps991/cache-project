const firebase = require('firebase');


const firebaseConfig = {
    apiKey: "AIzaSyCnkbtImS_HbJXuRyzWMpoR30GX_NPxaws",
    authDomain: "cache-project-328c0.firebaseapp.com",
    databaseURL: "https://cache-project-328c0.firebaseio.com",
    projectId: "cache-project-328c0",
    storageBucket: "cache-project-328c0.appspot.com",
    messagingSenderId: "701183449923",
    appId: "1:701183449923:web:e155168ee3ad99de17adf6",
    measurementId: "G-XRMEX1N8TM"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

database.ref().set({
    a: "1",
    b: "2",
    c: "3",
    d: "4",
    e: "5",
});

module.exports = database;