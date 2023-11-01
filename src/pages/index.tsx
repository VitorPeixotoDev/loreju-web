import Head from "next/head"
import Image from "next/image"
import styles from '../styles/home.module.scss'

import { Input } from '../components/ui/Input'
import { Button } from "../components/ui/Button"

import logo2 from '../../public/logo1.png'

export default function Home() {
  return (
    <>
      <Head>
        <title>Loreju - login</title>
      </Head>
      <div>
        <div className={styles.containerCenter}>
          <div>
            <Image src={logo2} alt="logo_loreju"/>
          </div>
          <div className={styles.login}>
            <form>
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
          </div>
        </div>
      </div>
    </>
  )
}
