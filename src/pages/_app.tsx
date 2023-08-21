import '../styles/global.scss'
import styles from '../styles/app.module.scss'

import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Player } from '../components/Player'
import { PlayerContextProvider } from '../contexts/PlayerContext'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.appContainer}>
      <PlayerContextProvider>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </PlayerContextProvider>
    </div>
  )
}
