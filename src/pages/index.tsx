import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { usePlayer } from '../contexts/PlayerContext'
import { GetStaticProps } from 'next'
import { api } from '../services/api'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'

import playButtonImg from '../assets/play-arrow.png'

import styles from '../styles/home.module.scss'

interface Episode {
  id: string
  title: string
  members: string
  publishedAt: string
  thumbnail: string
  url: string
  duration: number
  durationAsString: string
}

interface HomeProps {
  allEpisodes: Episode[]
  latestEpisodesReleases: Episode[]
}

export default function Home({
  allEpisodes,
  latestEpisodesReleases,
}: HomeProps) {
  const { playList } = usePlayer()

  const episodesList = [...latestEpisodesReleases, ...allEpisodes]

  return (
    <>
      <Head>
        <title>Home - Podcastr</title>
      </Head>
      <div className={styles.homeContainer}>
        <h2>Últimos lançamentos</h2>
        <section className={styles.lastReleases}>
          <ul>
            {latestEpisodesReleases.map((latest, index) => {
              return (
                <li key={latest.id}>
                  <Image
                    src={latest.thumbnail}
                    height={96}
                    width={96}
                    alt=""
                    objectFit="cover"
                  />
                  <div className={styles.podcastContent}>
                    <Link href={`/episodes/${latest.id}`}>
                      <a>{latest.title}</a>
                    </Link>
                    <p>{latest.members}</p>
                    <span>{latest.publishedAt}</span>
                    <span>{latest.durationAsString}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => playList(episodesList, index)}
                  >
                    <Image
                      src={playButtonImg}
                      height={25}
                      width={25}
                      alt="Tocar"
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
        <section className={styles.allEpisodes}>
          <h2>Todos os episódios</h2>
          <table cellSpacing={0}>
            <thead>
              <tr>
                <th></th>
                <th>Podcast</th>
                <th>Integrantes</th>
                <th>Data</th>
                <th>Duração</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allEpisodes.map((episode, index) => {
                return (
                  <tr key={episode.id}>
                    <td style={{ width: 72 }}>
                      <Image
                        src={episode.thumbnail}
                        alt={episode.title}
                        objectFit="cover"
                        width={40}
                        height={40}
                      />
                    </td>
                    <td>
                      <Link href={`/episodes/${episode.id}`}>
                        <a>{episode.title}</a>
                      </Link>
                    </td>
                    <td>{episode.members}</td>
                    <td style={{ width: 110 }}>{episode.publishedAt}</td>
                    <td>{episode.durationAsString}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          playList(
                            episodesList,
                            index + latestEpisodesReleases.length,
                          )
                        }
                      >
                        <Image
                          src={playButtonImg}
                          height={25}
                          width={25}
                          alt="Tocar"
                        />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  })

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      thumbnail: episode.thumbnail,
      url: episode.file.url,
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration),
      ),
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR,
      }),
    }
  })

  const latestEpisodesReleases = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodesReleases,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8, // 8 hours
  }
}
