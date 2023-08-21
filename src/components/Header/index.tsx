import Image from 'next/image'
import logoImg from '../../assets/podcastr-logo.svg'

import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import styles from './styles.module.scss'

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  })
  return (
    <header className={styles.headerContainer}>
      <div>
        <Image src={logoImg} alt="Podcastr" width={163} height={40} />
        <p>O melhor para você ouvir, sempre</p>
      </div>
      <span>{currentDate}</span>
    </header>
  )
}
