import Image from 'next/image'
import { Episode } from '../../../../contexts/PlayerContext'

import styles from './styles.module.scss'

interface EpisodeCoverProps {
  episode: Episode
}

export function EpisodeCover({ episode }: EpisodeCoverProps) {
  return (
    <div className={styles.playingEpisode}>
      <Image
        src={episode.thumbnail}
        width={296}
        height={346}
        alt="Podcast Cover"
        objectFit="cover"
      />
      <strong>{episode.title}</strong>
      <span>{episode.members}</span>
    </div>
  )
}
