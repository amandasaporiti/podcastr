import { Episode, usePlayer } from '../../../../contexts/PlayerContext'

interface AudioProps {
  audioRef: any
  episode: Episode
  onSetupProgressListener: () => void
  onEpisodeEnded: () => void
}

export function Audio({
  audioRef,
  episode,
  onEpisodeEnded,
  onSetupProgressListener,
}: AudioProps) {
  const { setPlayingState, isLooping } = usePlayer()
  return (
    <audio
      src={episode.url}
      ref={audioRef}
      autoPlay
      onPlay={() => setPlayingState(true)}
      onPause={() => setPlayingState(false)}
      loop={isLooping}
      onLoadedMetadata={onSetupProgressListener}
      onEnded={onEpisodeEnded}
    />
  )
}
