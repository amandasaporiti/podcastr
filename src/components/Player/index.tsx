import { usePlayer } from '../../contexts/PlayerContext'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import preview from '../../assets/play-preview.png'

import { AudioControl } from './components/AudioControl'
import { SliderProgress } from './components/SliderProgress'
import { Audio } from './components/Audio'

import styles from './styles.module.scss'
import { EmptyPlayer } from './components/EmptyPlayer'
import { EpisodeCover } from './components/EpisodeCover'

export function Player() {
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const {
    currentEpisodeIndex,
    episodes,
    isPlaying,
    hasNext,
    playNext,
    clearPlayerState,
  } = usePlayer()

  // força ser a primeira posição do array
  const episode = episodes[currentEpisodeIndex]

  useEffect(() => {
    if (!audioRef.current) {
      return
    }

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  function setupProgressListener() {
    audioRef.current.currentTime = 0

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount
    setProgress(amount)
  }

  function handleEpisodeEnded() {
    if (hasNext) {
      playNext()
    } else {
      clearPlayerState()
    }
  }

  return (
    <div className={styles.playerContainer}>
      <header>
        <Image src={preview} alt="" height={32} width={32} />
        <strong>Tocando agora</strong>
      </header>
      {episode ? <EpisodeCover episode={episode} /> : <EmptyPlayer />}

      <footer className={!episode ? styles.empty : ''}>
        <SliderProgress
          episode={episode}
          progress={progress}
          onSeek={handleSeek}
        />

        {episode && (
          <Audio
            audioRef={audioRef}
            episode={episode}
            onEpisodeEnded={handleEpisodeEnded}
            onSetupProgressListener={setupProgressListener}
          />
        )}

        <AudioControl episode={episode} />
      </footer>
    </div>
  )
}
