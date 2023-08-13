import { createContext, ReactNode, useEffect, useState } from "react";
import {destroyCookie, parseCookies, setCookie} from 'nookies';
import { api } from "../services/apiClient";
import Router from "next/router"; 
import { setupApiClient } from "../services/api";

interface UserProps{
cod : string
nome : string
email : string
cargo :  string
}
type AuthProviderProps = {
    children : ReactNode

}

interface SignInProps {
    email: string
    password: string
}


interface SignUpProps {
    email: string
    password: string
    name: string
    cargo: string
}



interface AuthContextData  {
    user: UserProps,
    isAuthenticated: boolean,
    signIn: (credentials: SignInProps)=> Promise<void>;
    signUp: (credentials: SignUpProps)=> Promise<void>;
    logOut: ()=> Promise<void>;
}

export function signOut(){
    try{
        destroyCookie(null, '@mercearia.token', {path: "/"})

        Router.push("/login")

    }catch(err){
        console.log(err)
    
    }
}

export const AuthContext = createContext({}as AuthContextData)

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user

    async function signIn({email, password}: SignInProps){
        try{
            const response = await api.post("/login", {
                email: email,
                senha: password
            })

            const { cod, nome, cargo, token } = response?.data

            setCookie(null, '@mercearia.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/"
            })
            setUser({
                cargo: cargo, cod: cod, email: email, nome: nome
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            Router.push("/dashboard")

        }catch(err){

            console.log(err.response)
        }
    }
   useEffect(()=>{
    const {'@mercearia.token': token} = parseCookies();
   console.log(token)

    if(token){
        const api = setupApiClient();
        api.get('/usuario').then(res=>{
            const {cod, cargo, nome, email} = res.data;
           
            setUser({
                cargo: cargo, cod: cod, email: email, nome: nome
            })
        }).catch(ERR=>{
            signOut();
        })
    }



    },[])

    async function logOut(){
        try{
            destroyCookie(null, "@mercearia.token", { path: "/" })
            Router.push("/login")
            setUser(null)

        }catch(err){
            console.log("errror ao sair")
        }
    }


    async function signUp({ cargo, email, name,  password }: SignUpProps) {
        try{
            
            const response = await api.post("/usuario", {
                nome: name,
                cargo: cargo,
                email: email,
                senha: password,
            });
            console.log(response.data)
            Router.push("/login")

        }catch(err){

            console.log("error ao cadastrar", err)
        }
    }

    return (
       <AuthContext.Provider value={{ isAuthenticated, user, signIn, logOut, signUp}}>
        {children}
       </AuthContext.Provider>
    )
}