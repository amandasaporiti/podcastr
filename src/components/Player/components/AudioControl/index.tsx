import Image from 'next/image'
import { Episode, usePlayer } from '../../../../contexts/PlayerContext'

import playNextImg from '../../../../assets/play-next.svg'
import playPreviousImg from '../../../../assets/play-previous.svg'
import shuffleImg from '../../../../assets/shuffle.svg'
import repeatImg from '../../../../assets/repeat.svg'
import playImg from '../../../../assets/play.svg'
import pauseImg from '../../../../assets/pause.svg'

import styles from './styles.module.scss'

interface AudioControlProps {
  episode: Episode
}

export function AudioControl({ episode }: AudioControlProps) {
  const {
    episodes,
    isPlaying,
    togglePlay,
    hasNext,
    hasPrevious,
    playNext,
    playPrevious,
    isLooping,
    toggleLoop,
    isShuffling,
    toggleShuffle,
  } = usePlayer()
  return (
    <div className={styles.buttons}>
      <button
        type="button"
        disabled={!episode || episodes.length === 1}
        onClick={toggleShuffle}
        className={isShuffling ? styles.isActive : ''}
      >
        <Image src={shuffleImg} width={24} height={24} alt="Aleatório" />
      </button>
      <button
        type="button"
        disabled={!episode || !hasPrevious}
        onClick={playPrevious}
      >
        <Image
          src={playPreviousImg}
          width={24}
          height={24}
          alt="Tocar Anterior"
        />
      </button>
      <button
        type="button"
        className={styles.playButton}
        disabled={!episode}
        onClick={togglePlay}
      >
        {isPlaying ? (
          <Image src={pauseImg} width={32} height={32} alt="Pausar" />
        ) : (
          <Image src={playImg} width={32} height={32} alt="Tocar" />
        )}
      </button>
      <button type="button" disabled={!episode || !hasNext} onClick={playNext}>
        <Image src={playNextImg} width={24} height={24} alt="Tocar Próxima" />
      </button>
      <button
        type="button"
        disabled={!episode}
        onClick={toggleLoop}
        className={isLooping ? styles.isActive : ''}
      >
        <Image src={repeatImg} width={24} height={24} alt="Repetir" />
      </button>
    </div>
  )
}
