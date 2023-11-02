import styles from './styles.module.scss'
import Link from 'next/link'
import { FiLogOut } from 'react-icons/fi'



export const Header = () => {
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href= '/dashboard'>
                    <img src='./logo2.png' width={100} height={80} />
                </Link>

                <nav>
                    <Link href='category'>
                        categoria
                    </Link>
                    
                    <Link href='product'>
                        menu
                    </Link>

                    <button>
                        <FiLogOut color='#722f37' size={24}/>
                    </button>


                </nav>
            </div>
        </header>
    )
}