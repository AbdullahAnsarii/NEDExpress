import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';
import { Alert } from 'react-native';
// import { LoginManager, AccessToken } from 'react-native-fbsdk';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            switch (e.code) {
              case 'auth/user-not-found':
                Alert.alert("NED Express", `${email} is not registered with NED Express`);
                break;
              case 'auth/wrong-password':
                Alert.alert("NED Express", `The password you entered is incorrect`);
                break;
              case 'auth/invalid-email':
                Alert.alert("NED Express", `The email address is badly formatted`);
                break;
              case 'auth/network-request-failed':
                Alert.alert("NED Express", "Please make sure you are connected to internet and try again");
              case 'auth/unknown':
                Alert.alert("NED Express", "An unknown error occured, please try again")
              default:
                Alert.alert("NED Express",e.message);
                break;
            }

          }
        },
        googleSignup: async () => {
          try {
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential)
              // Use it only when user Sign's up, 
              // so create different social signup function
              .then(() => {
                //Once the user creation has happened successfully, we can add the currentUser into firestore
                //with the appropriate details.
                console.log('current User', auth().currentUser);
                firestore().collection('users').doc(auth().currentUser.uid)
                  .set({
                    Name: auth().currentUser.displayName,
                    ContactNo: auth().currentUser.phoneNumber,
                    RollNo: "",
                    Department: "",
                    Email: auth().currentUser.email,
                    CreatedAt: firestore.Timestamp.fromDate(new Date()),
                    UserImg: auth().currentUser.photoURL,
                    SignInMethod: "Gmail",
                    UserID: auth().currentUser.uid,
                    Verified: "Not Verified"
                  })
                  //ensure we catch any errors at this stage to advise us if something does go wrong
                  .catch(error => {
                    console.log('Something went wrong with added user to firestore: ', error);
                  })
              })
              //we need to catch the whole sign up process if it fails too.
              .catch(error => {
                console.log('Something went wrong with sign up: ', error);
              });
          } catch (error) {
            console.log({ error });
          }
        },
        googleLogin: async () => {
          try {
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential)
          } catch (error) {
            console.log({ error });
          }
        },
        register: async (name, email, password, rollno, department, contactno) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password)
              .then(() => {
                //Once the user creation has happened successfully, we can add the currentUser into firestore
                //with the appropriate details.
                firestore().collection('users').doc(auth().currentUser.uid)
                  .set({
                    Name: name,
                    Email: email,
                    RollNo: rollno,
                    Department: department,
                    ContactNo: contactno,
                    CreatedAt: firestore.Timestamp.fromDate(new Date()),
                    UserImg: null,
                    SignInMethod: "Email/Password",
                    UserID: auth().currentUser.uid,
                    Verified: "Not Verified"

                  })
                  //ensure we catch any errors at this stage to advise us if something does go wrong
                  .catch(error => {
                    console.log('Something went wrong with added user to firestore: ', error);
                  })
              })
              //we need to catch the whole sign up process if it fails too.
              .catch(e => {
                switch (e.code) {
                  case 'auth/email-already-in-use':
                    Alert.alert("NED Express", `${email} is already registered with NED Express`);
                    break;
                  default:
                    Alert.alert("NED Express",e.message);
                    break;}
              });
          } catch (e) {
            console.log(e)
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

