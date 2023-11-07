import { createContext, ReactNode, useState, useEffect } from 'react'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import { toast } from 'react-toastify'
import Router from 'next/router'

import { api } from '../services/apiClient'

type AuthContextData = {
    user: UserProps
    isAuthenticated: boolean
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void
    signUp: (credentials: SignUpProps) => Promise<void>
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

type SignUpProps = {
    name: string
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

    useEffect(() => {
        const {'@loreju.token': token} = parseCookies()

        if(token){
            api.get('/me').then(response => {
                const {id, name, email} = response.data

                setUser({
                    id,
                    name,
                    email
                })
            })
            .catch(() => {
                signOut()
            })
        }
    }, [])

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
            toast.success(`Bem-vinda(o) ao Loreju, ${name}!`)

            //redirecionar user para /dashboard
            Router.push('/dashboard')
        } catch (error) {
            toast.error('Há algo errado com suas informações.')
            console.log('ALERT [01202] ', error)
        }
    }

    const signUp = async ({name, email, password}: SignUpProps) => {
        try {
            const response = await api.post('/users', {
                name,
                email,
                password
            })

            toast.success('Conta criada com sucesso!')
            Router.push('/')
        } catch (error) {
            toast.error('Há algo errado com suas informações.')
            console.log('ALERT [01202] ', error)
        }
    }

    return(
        <AuthContext.Provider value={{
            user, isAuthenticated, signIn, signOut, signUp
        }}>
            {children}
        </AuthContext.Provider>
    )
}