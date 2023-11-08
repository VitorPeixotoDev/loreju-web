import Head from 'next/head'
import { FiRefreshCcw } from 'react-icons/fi'

import { canSSRAuth } from '../../utils/canSSRAuth'
import { Header } from '../../components/Header'
import styles from './styles.module.scss'

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Loreju | painel</title>
            </Head>
            <div>
                <Header/>
                
                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Últimos pedidos</h1>

                        <button>
                            <FiRefreshCcw color='#626e60' size={25}/>
                        </button>
                    </div>

                    <article className={styles.listOrders}>

                        <section className={styles.orderItem}>
                            <button>
                                <div className={styles.tag}/>
                                <span>Mesa 30</span>
                            </button>
                        </section>

                    </article>

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