import style from './Button.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

export type ButtonProps = {
    icon: IconProp;
    onClick: () => void;
}

function Button(props: ButtonProps) {

  return (
    <button className={style.button} onClick={props.onClick}>
        <FontAwesomeIcon icon={props.icon} size='3x'/>
    </button>
  )
}

export default Button
