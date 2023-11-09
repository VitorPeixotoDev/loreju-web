import { useState } from 'react'
import Head from 'next/head'
import { FiRefreshCcw } from 'react-icons/fi'
import Modal from 'react-modal'

import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { Header } from '../../components/Header'
import ModalOrder from '../../components/ModalOrder'
import styles from './styles.module.scss'

type OrderProps = {
    id: string 
    table: string | number
    status: boolean
	draft: boolean
	name: string | null
}

export type OrderItemProps = {
    id: string
    amount: number
    order_id: string
    product_id: string
    product: {
        id: string
        name: string
        description: string
        price: string
        banner: string
    }
    order: {
        id: string
        table: string | number
        status: boolean
        name: string | null
    }
}

interface HomeProps {
    orders: OrderProps[]
}

export default function Dashboard({orders}: HomeProps) {
    const [orderList, setOrderList] = useState(orders || [])
    const [modalItem, setModalItem] = useState<OrderItemProps[]>()
    const [modalVisible, setModalVisible] = useState(false)

    const handleClosedModal = () => {
       setModalVisible(false) 
    }

    const handleOpenModalView = async (id: string) => {
        const apiClient = setupAPIClient()
        const response = await apiClient.get('/order/detail', {
            params: {
                order_id: id
            }
        })

        setModalItem(response.data)
        setModalVisible(true)
    }

    Modal.setAppElement('#__next')

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
                        {orderList.map(item => (
                        <section key={item.id} className={styles.orderItem}>
                            <button 
                                onClick={() => handleOpenModalView(item.id)}
                            >
                                <div className={styles.tag}/>
                                <span>Mesa {item.table}</span>
                            </button>
                        </section>
                        )) }


                    </article>

                </main>
                {modalVisible && (<ModalOrder
                    isOpen={modalVisible}
                    onRequestClose={handleClosedModal}
                    order={modalItem}
                />)}
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async ctx => {
    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get('/orders')
    //console.log(response.data)

    return {
        props: {
            orders: response.data
        }
    }
})