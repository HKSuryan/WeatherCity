# WeatherCity

## Firestore
Create a project on https://firebase.google.com/ and also a firestore database.

## openweathermap
Create an account on https://openweathermap.org/ and get an API key.
and change the credentials in the weatherService.js

copy paste this section from the firebase and add this in the firebase.js

const firebaseConfig = {


apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ,
projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
appId: process.env.REACT_APP_FIREBASE_APP_ID 
};

And just install the modules in the package.json and you are set to go

For demo of the working project see these videos
