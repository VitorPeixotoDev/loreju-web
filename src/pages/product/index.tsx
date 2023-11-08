import { ChangeEvent, FormEvent, useState } from "react"
import Head from "next/head"
import { FiUpload } from 'react-icons/fi'
import { toast } from 'react-toastify'

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
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
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

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault()

        try {
            const data = new FormData()
            const isIncorrect = name === '' || price === '' || description === '' || imageAvatar === null

            if(isIncorrect){
                toast.error('Verifique se você preencheu todas as informações corretamente.')
                return 
            }

            data.append('name', name)
            data.append('price', price)
            data.append('description', description)
            data.append('category_id', categories[categorySelected].id)
            data.append('file', imageAvatar)

            const apiClient = setupAPIClient()
            await apiClient.post('/product', data)

            toast.success('Produto cadastrado com sucesso!')

        } catch (error) {
            console.log(error)
            toast.error('Não foi possível registrar o produto.')
        }


        setName('')
        setPrice('')
        setDescription('')
        setImageAvatar(null)
        setAvatarUrl('')
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
                    <form 
                        className={styles.form}
                        onSubmit={handleRegister}
                    >
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
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="qual o valor do produto"
                            className={styles.input}
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />

                        <textarea
                            placeholder="descreva o produto"
                            className={styles.input}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
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