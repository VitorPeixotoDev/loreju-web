import { FormEvent, useContext, useState } from 'react'
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import styles from '../styles/home.module.scss'
import { toast } from 'react-toastify'

import { AuthContext } from '../contexts/AuthContext'

import { Input } from '../components/ui/Input'
import { Button } from "../components/ui/Button"

import logo2 from '../../public/logo1.png'

export default function Home() {
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()

    if(email == '' || password == ''){
      toast.warning('Preencha todos os campos.')
      return 
    }

    setLoading(true)

    let data = {
      email,
      password
    }

    await signIn(data)
    setLoading(false)
    setEmail('')
    setPassword('')
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
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Input 
                placeholder="digite sua senha"
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Button
                type='submit'
                loading={loading}
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
