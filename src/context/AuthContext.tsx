import { createContext, ReactNode, useState } from "react";
import {destroyCookie, setCookie} from 'nookies';
import { api } from "../services/apiClient";
import Router from "next/router"; 

interface UserProps{
cod : string
nome : string
email : string
cargo : "admin" | "caixa" | string
}
type AuthProviderProps = {
    children : ReactNode

}

interface SignInProps {
    email: string
    password: string
}

interface AuthContextData  {
    user: UserProps,
    isAuthenticated: boolean,
    signIn: (credentials: SignInProps)=> Promise<void>;
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

            const { cod, nome, cargo, token } = response.data

            setCookie(null, '@mercearia.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/"
            })

            setUser({
                cargo,
                cod,
                email,
                nome
            })

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            Router.push("/dashboard")

        }catch(err){

            console.log(err.response)
        }
    }

    return (
       <AuthContext.Provider value={{ isAuthenticated, user, signIn}}>
        {children}
       </AuthContext.Provider>
    )
}