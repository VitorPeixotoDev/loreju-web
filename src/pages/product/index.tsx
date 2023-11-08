import { ChangeEvent, useState } from "react"
import Head from "next/head"
import { FiUpload } from 'react-icons/fi'

import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { Header } from '../../components/Header'
import styles from './styles.module.scss'

type ItemProps = {
    id: string
    name: string
}

interface CategoryProps {
    categoryList: ItemProps[]
}

const Product = ({categoryList}: CategoryProps) => {
    const [avatarURL, setAvatarUrl] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null) 
    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySeleceted] = useState(0)

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files)return

        const image = e.target.files[0]
        if(!image) return
        if(image.type === 'image/png' || image.type === 'image/jpeg'){
            setImageAvatar(image)
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleChangeCategory = event => {
        //console.log('categoria ', categories[event.target.value])
        setCategorySeleceted(event.target.value)
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

                        <select 
                            value={categorySelected}
                            onChange={handleChangeCategory}
                        >
                                {categories.map((item, index) => {
                                    return(
                                        <option key={item.id} value={index}>
                                            {item.name}
                                        </option>
                                    )
                                })}
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
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/category')
    //console.log(response.data)

    return {
        props: {
            categoryList: response.data
        }
    }
})

export default Product