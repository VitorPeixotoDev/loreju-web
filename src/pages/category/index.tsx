import { FormEvent, useState } from 'react'
import Head from "next/head"
import { toast } from 'react-toastify'

import { Header } from '../../components/Header'
import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import styles from './styles.module.scss'

const Category = () => {
    const [name, setName] = useState('')

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault()

        if(name === '') return 
        const apiClient = setupAPIClient()
        await apiClient.post('/category', {
            name
        })

        toast.success(`Categoria "${name}" cadastrada com sucesso!`)
        setName('')
    }

    return(
        <>
            <Head>
                <title>Loreju | categorias</title>
            </Head>
            <div>
                <Header/>
                <main className={styles.container}>
                    <h1>cadastrar categorias</h1>

                    <form 
                        className={styles.form}
                        onSubmit={handleRegister}
                    >
                        <input 
                            type="text"
                            placeholder="nome da categoria"
                            className={styles.input}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <button 
                            type='submit'
                            className={styles.buttonAdd}
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

export default Category