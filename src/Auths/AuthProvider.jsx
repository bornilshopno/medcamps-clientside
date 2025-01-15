import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "./firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";



export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const axiosPublicly = useAxiosPublic()
    const [registered, setRegistered] = useState(false);
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(null);


    //firebase lookup
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            //jwt => get token and set client
            if (currentUser) {
                const userInfo = currentUser.email;
                axiosPublicly.post("jwt", userInfo)
                .then(res=>{console.log(res.data);
                    if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token);
                        //can be checked from client side=>inspect==>Application==>LocalStorage==>clientURL[when login/logout]
                    }
                })
            }
            else{
                //TO DO : remove token(if token stored in the client side [localStorage, caching, inMemory])
                //for HTTP only== cookies need to remove from server side
                localStorage.removeItem('access-token')
            }

        })
        return (() => unSubscribe())
    }, [auth,axiosPublicly])


    // useEffect(() => {
    //     const unSubscribe = onAuthStateChanged(auth, currentUser => {
    //         setUser(currentUser);

    //     }
    // if (currentUser) {
    //     // get token and store client 
    //     const userInfo = { email: currentUser.email }
    //     axiosPublicly.post('/jwt', userInfo)
    //         .then(res => {
    //             console.log(res.data)
    //         if (res.data.token) {
    //             localStorage.setItem('access-token', res.data.token);
    //             //can be checked from client side=>inspect==>Application==>LocalStorage==>clientURL[when login/logout]
    //         }
    //  })
    // }
    // else {
    //     //TO DO : remove token(if token stored in the client side [localStorage, caching, inMemory])
    //     //for HTTP only== cookies need to remove from server side
    //     localStorage.removeItem('access-token')
    //         // }
    //         console.log("CurrentUser from statechanged", currentUser)
    //         setLoading(false)
    //     // })
    //     return (() => unSubscribe())  //in module it was return inside of an array funciton
    // }, [auth,])


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUserProfile = (name, photo) => {

        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logout = () => {
        setLoading(true);
        return signOut(auth)
    }

    //google
    const provider = new GoogleAuthProvider();
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }


    const authInfo = { registered, setRegistered, user, loading, setLoading, createUser, userLogin, logout, updateUserProfile, googleSignIn }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;