import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import styles from '../../styles/home.module.scss'

import { Input } from '../../components/ui/Input'
import { Button } from "../../components/ui/Button"

import logo2 from '../../../public/logo1.png'

export default function SignUp() {
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
            <form>
            <Input 
                placeholder="digite seu nome"
                type='text'
              />
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
