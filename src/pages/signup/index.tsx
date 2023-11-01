import { useState, FormEvent } from 'react'
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import styles from '../../styles/home.module.scss'

import { Input } from '../../components/ui/Input'
import { Button } from "../../components/ui/Button"

import logo2 from '../../../public/logo1.png'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault()

    if(name == '' || email == '' || password == ''){
      alert('Preencha corretamente todos os campos.')
      return
    } 

    setLoading(true)
  }

  return (
    <>
      <Head>
        <title>Loreju | cadastre-se</title>
      </Head>
      <div>
        <div className={styles.containerCenter}>
          <div>
            <Image className={styles.imgLogo} src={logo2} alt="logo_loreju"/>
          </div>
          <div className={styles.login}>
            <h1>criando nova conta</h1>
            <form onSubmit={handleSignUp}>
            <Input 
                placeholder="digite seu nome"
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
              />
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
                cadastrar
              </Button>
            </form>
            <Link
              className={styles.text} 
              href='./'>
              já possuo uma conta
            </Link>
            
          </div>
        </div>
      </div>
    </>
  )
}
