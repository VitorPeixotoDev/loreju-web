import { FormEvent, useState } from 'react'
import Head from "next/head"
import { Header } from '../../components/Header'
import styles from './styles.module.scss'

const Category = () => {
    const [name, setName] = useState('')

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault()

        alert(`CATEGORIA ${name}`)
    }

    return(
        <>
            <Head>
                <title>Nova categoria - Loreju</title>
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

export default Category