import Head from "next/head"
import Image from "next/image"
import styles from '../styles/home.module.scss'

import { Input } from '../components/ui/Input'

import logo2 from '../../public/logo1.png'

export default function Home() {
  return (
    <>
      <Head>
        <title>Loreju - login</title>
      </Head>
      <div>
        <div className={styles.containerCenter}>
          <Image src={logo2} alt="logo_loreju"/>
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
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
