import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './Footer.module.css'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

function Footer() {

  return (
    <div className={style.footer}>
      <div className={style.footerContent}>
        <a href="">
          <FontAwesomeIcon icon={faGithub} size='2x'/>
        </a>
      </div>
    </div>
  )
}

export default Footer
