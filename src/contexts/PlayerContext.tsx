import { ReactNode, createContext, useContext, useState } from 'react'

interface PlayerContextProviderProps {
  children: ReactNode
}

export interface Episode {
  id: string
  title: string
  members: string
  duration: number
  url: string
  thumbnail: string
}

interface PlayerContextData {
  episodes: Episode[]
  currentEpisodeIndex: number
  playEpisode: (episode: Episode) => void
  isPlaying: boolean
  togglePlay: () => void
  toggleLoop: () => void
  toggleShuffle: () => void
  isLooping: boolean
  isShuffling: boolean
  setPlayingState: (state: boolean) => void
  playList: (list: Episode[], index: number) => void
  hasNext: boolean
  hasPrevious: boolean
  playNext: () => void
  playPrevious: () => void
  clearPlayerState: () => void
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  function playEpisode(episode: Episode) {
    setEpisodes([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function playList(list: Episode[], index: number) {
    setEpisodes(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function toggleLoop() {
    setIsLooping(!isLooping)
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  function clearPlayerState() {
    setEpisodes([])
    setCurrentEpisodeIndex(0)
  }

  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodes.length
  const hasPrevious = currentEpisodeIndex > 0

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodes.length)
      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        episodes,
        currentEpisodeIndex,
        playEpisode,
        isPlaying,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        isLooping,
        isShuffling,
        setPlayingState,
        playList,
        hasNext,
        hasPrevious,
        playNext,
        playPrevious,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext)
}
