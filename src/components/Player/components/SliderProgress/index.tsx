import Slider from 'rc-slider'
import { Episode } from '../../../../contexts/PlayerContext'
import { convertDurationToTimeString } from '../../../../utils/convertDurationToTimeString'

import 'rc-slider/assets/index.css'
import styles from './styles.module.scss'

interface SliderProgressProps {
  episode: Episode
  progress: number
  onSeek: (amount: number) => void
}

export function SliderProgress({
  episode,
  progress,
  onSeek,
}: SliderProgressProps) {
  return (
    <div className={styles.progress}>
      <span>{convertDurationToTimeString(progress)}</span>
      <div className={styles.sliderWrapper}>
        {episode ? (
          <Slider
            max={episode.duration}
            value={progress}
            onChange={onSeek}
            trackStyle={{ backgroundColor: '#04D361' }}
            railStyle={{ backgroundColor: '#9f75ff' }}
            handleStyle={{ borderColor: '#04D361', borderWidth: 4 }}
          />
        ) : (
          <div className={styles.slider} />
        )}
      </div>
      <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
    </div>
  )
}
