import style from './Modal.module.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'

export type ModalProps = {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

function Modal(props: ModalProps) {

    if (!props.isOpen) {
        return null
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            props.onClose()
        }
    }

    return (
        <div className={style.overlay} onClick={handleOverlayClick}>
            <div className={style.modal}>
                <div className={style.closeButton}>
                    <Button onClick={props.onClose} icon={faXmark} />
                </div>
                <div className={style.content}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Modal
