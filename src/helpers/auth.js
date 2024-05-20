import {
    AuthErrorCodes,
    createUserWithEmailAndPassword,
    getAuth,
    setPersistence,
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    inMemoryPersistence,
  } from "firebase/auth";
  import { firebaseApp } from "../services/firebase";
  
  const auth = getAuth(firebaseApp);
  
  // sign in function with Google
  export const signInWithGoogle = () => {
    setPersistence(auth, inMemoryPersistence)
      .then(() => {
        const provider = new GoogleAuthProvider();
        
        return signInWithPopup(auth, provider);
      })
      .catch((err) => {
        console.log(err.code);
        alert(err.code);
      });
  };
  
  // update user profile
  export const profileUpdate = (displayName) => {
    updateProfile(auth.currentUser, {
      displayName,
    })
      .then(() => {
        // Profile updated!
        alert("Profile updated");
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };
  
  // monitor auth status function
  export const handleAuthState = (setAuth) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuth(true);
        console.log(user);
        console.log(user.email);
        console.log(user.displayName);
        console.log(user.photoURL);
        console.log(user.emailVerified);
      } else {
        setAuth(false);
        console.log(user);
      }
    });
  };
  
  // sign out function
  export const logOut = () => {
    signOut(auth);
  };
  
  // sign up function
  export const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user);
        // ...
      })
      .catch((err) => {
        if (
          err.code === AuthErrorCodes.INVALID_PASSWORD ||
          err.code === AuthErrorCodes.USER_DELETED
        ) {
          alert("Email or password might be incorrect");
        } else {
          console.log(err.code);
          alert(err.code);
        }
      });
  };
  
  // sign in function
  export const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        console.log(userCredential.user);
        // ...
      })
      .catch((err) => {
        console.log(err.code);
        alert(err.code);
      });
  };
  
  // sign in function with Github
  export const signInWithGithub = () => {
    const provider = new GithubAuthProvider();
  
    signInWithPopup(auth, provider)
      .then((result) => {
        const userrr = result.user;
        console.log(userrr);
        // ...
      })
      .catch((err) => {
        console.log(err.code);
        alert(err.code);
      });
  };