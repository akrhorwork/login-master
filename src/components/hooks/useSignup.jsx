import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { useContext } from "react";
import { GlobalContect } from "../../context/useGlobalContext";
function useSignup() {
    const {dispatch} =  useContext(GlobalContect)
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null);
    const singupWithGoggle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          setUser(user);
          dispatch({
            type:"SIGN_IN",
            payload: user
          })
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          setError(errorMessage);
        });
    };
  return { singupWithGoggle, user, error };
}

export  {useSignup};
