import Modal from 'react-modal'
import { FiX } from 'react-icons/fi'

import { OrderItemProps } from '../../pages/dashboard'
import styles from './styles.module.scss'

interface ModalOrderProps {
    isOpen: boolean
    onRequestClose: () => void
    order: OrderItemProps[]
}

const ModalOrder = ({isOpen, onRequestClose, order}: ModalOrderProps) => {
    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#f5f5f5'
        }
    }

    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <button 
                type='button'
                onClick={onRequestClose}
                className='react-modal-close'
                style={{
                    background: 'transparent',
                    border: 0
                }}
            >
                <FiX color='#722f37' size={45}/>
            </button>

            <div className={styles.container}>
                <h2>detalhes do pedido</h2>
                <span className={styles.table}>
                    mesa: <strong>{order[0].order.table}</strong>
                </span>
                {order.map(item => (
                    <section key={item.id} className={styles.containerItem}>
                        <span>{item.amount} - <strong>{item.product.name}</strong></span>
                    </section>
                ))}

                <button
                    className={styles.buttonOrder}
                    onClick={() => {}}
                >
                    concluir pedido
                </button>
            </div>
        </Modal>
    )
}

export default ModalOrder