import { useContext } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import { FiLogOut } from 'react-icons/fi'

import { AuthContext } from '../../contexts/AuthContext' 



export const Header = () => {
    const { signOut } = useContext(AuthContext)

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href= '/dashboard'>
                    <img src='./logo2.png' width={100} height={80} />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href='category'>
                        categoria
                    </Link>

                    <Link href='product'>
                        produto
                    </Link>
                    
                    <Link href='product'>
                        menu
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color='#722f37' size={24}/>
                    </button>


                </nav>
            </div>
        </header>
    )
}