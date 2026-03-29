


import { faArrowDown, faArrowLeft, faArrowRight, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import Button from '../atoms/Button'
import View from './View'
import style from './ViewWrapper.module.css'
import { usePixel } from '../../contexts/usePixel';

function ViewWrapper() {

    const { dispatch } = usePixel();

    return (
        <div className={style.wrapperVertical}>
            <Button icon={faArrowUp} onClick={() => dispatch({ type: 'up' })} />
            <div className={style.wrapperHorizontal}>
                <Button icon={faArrowLeft} onClick={() => dispatch({ type: 'left' })} />
                <View />
                <Button icon={faArrowRight} onClick={() => dispatch({ type: 'right' })} />
            </div>
            <Button icon={faArrowDown} onClick={() => dispatch({ type: 'down' })} />
        </div>
    )
}

export default ViewWrapper
