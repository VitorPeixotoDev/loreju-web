import { ChangeEvent, useState } from "react"
import Head from "next/head"
import { FiUpload } from 'react-icons/fi'

import { canSSRAuth } from '../../utils/canSSRAuth'
import { Header } from '../../components/Header'
import styles from './styles.module.scss'

const Product = () => {
    const [avatarURL, setAvatarUrl] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null) 

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files)return

        const image = e.target.files[0]
        if(!image) return
        if(image.type === 'image/png' || image.type === 'image/jpeg'){
            setImageAvatar(image)
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

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

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={25} color='#722f37'/>
                            </span>

                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={handleFile}
                            />

                            {avatarURL && (
                                <img
                                    className={styles.preview}
                                    src={avatarURL}
                                    alt='foto_produto_cadastrado'
                                    width={220}
                                    height={220}
                                />
                            )}


                        </label>

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