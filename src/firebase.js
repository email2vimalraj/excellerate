import React from "react";
import firebase from "firebase/app";

import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};

const FirebaseContext = React.createContext({
  firebase: null
});

const FirebaseProvider = ({ children }) => {
  const [firebaseState, setFirebaseState] = React.useState(null);

  React.useEffect(() => {
    setFirebaseState(firebase.initializeApp(firebaseConfig));
  }, []);

  return (
    <FirebaseContext.Provider value={{ firebase: firebaseState }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;
export { FirebaseProvider };
