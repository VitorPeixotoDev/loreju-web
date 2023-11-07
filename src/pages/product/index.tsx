import Head from "next/head"

import { canSSRAuth } from '../../utils/canSSRAuth'
import { Header } from '../../components/Header'
import styles from './styles.module.scss'

const Product = () => {
    return(
        <>
            <Head>
                <title>Loreju | produtos</title>
            </Head>

            <div>
                <Header/>
                <main className={styles.container}>
                    <h1>novo produto</h1>
                    <form className={styles.form}>

                        <select>
                            <option>
                                bebida
                            </option>
                            <option>
                                pizza
                            </option>
                        </select>

                        <input 
                            type="text"
                            placeholder="qual o nome do produto"
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="qual o valor do produto"
                            className={styles.input}
                        />

                        <textarea
                            placeholder="descreva o produto"
                            className={styles.input}
                        />

                        <button 
                            type="submit"
                            className={styles.button}
                        >
                            cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
        
    )
}

export const getServerSideProps = canSSRAuth(async ctx => {
    return {
        props: {}
    }
})

export default Product