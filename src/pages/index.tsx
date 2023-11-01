import { FormEvent, useContext } from 'react'
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import styles from '../styles/home.module.scss'

import { AuthContext } from '../contexts/AuthContext'

import { Input } from '../components/ui/Input'
import { Button } from "../components/ui/Button"

import logo2 from '../../public/logo1.png'

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()

    let data = {
      email: "email@email.com",
      password: '123123'
    }

    await signIn(data)
  }

  return (
    <>
      <Head>
        <title>Loreju | login</title>
      </Head>
      <div>
        <div className={styles.containerCenter}>
          <div>
            <Image className={styles.imgLogo} src={logo2} alt="logo_loreju"/>
          </div>
          <div className={styles.login}>
            <form onSubmit={handleLogin}>
              <Input 
                placeholder="digite seu email"
                type='text'
              />
              <Input 
                placeholder="digite sua senha"
                type='password'
              />
              <Button
                type='submit'
                loading={false}
              >
                acessar
              </Button>
            </form>
            <Link
              className={styles.text} 
              href='./signup'>
              cadastrar-se
            </Link>
            
          </div>
        </div>
      </div>
    </>
  )
}
