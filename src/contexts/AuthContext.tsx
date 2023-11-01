import { createContext, ReactNode, useState } from 'react'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { api } from '../services/apiClient'

type AuthContextData = {
    user: UserProps
    isAuthenticated: boolean
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void
}

type UserProps = {
    id: string
    name: string
    email: string
}

type SignInProps = {
    email: string
    password: string
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export const signOut = () => {
    try {
        destroyCookie(undefined, '@loreju.token')
        Router.push('/')
    } catch (error) {
        console.log('ALERT [01202] ', error)
    }
}

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user

    const signIn = async ({email, password}: SignInProps) => {
        try {
            const response = await api.post('/session', {
                email, 
                password
            })
            //console.log(response.data)
            const {id, name, token} = response.data
            setCookie(undefined, '@loreju.token', token, {
                maxAge: 60*60*24*30,
                path: '/'
            })

            setUser({
                id,
                name,
                email
            })

            //persistir token em requisições futuras
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            //redirecionar user para /dashboard
            Router.push('/dashboard')
        } catch (error) {
            console.log('ALERT [01202] ', error)
        }
    }

    return(
        <AuthContext.Provider value={{
            user, isAuthenticated, signIn, signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}