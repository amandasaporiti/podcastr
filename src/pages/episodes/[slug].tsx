import { GetStaticPaths, GetStaticProps } from 'next'
import { api } from '../../services/api'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'
import { usePlayer } from '../../contexts/PlayerContext'

import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'

import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import playImg from '../../assets/play.svg'
import arrowLeftImg from '../../assets/arrow-left.png'
import styles from '../../styles/episodes.module.scss'

interface Episode {
  id: string
  title: string
  description: string
  members: string
  publishedAt: string
  thumbnail: string
  url: string
  duration: number
  durationAsString: string
}

interface EpisodesProps {
  episode: Episode
}

export default function Episodes({ episode }: EpisodesProps) {
  const { playEpisode } = usePlayer()
  return (
    <>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>

      <div className={styles.episodeContainer}>
        <div className={styles.thumbnailContainer}>
          <Link href="/">
            <button type="button">
              <Image
                src={arrowLeftImg}
                alt="Voltar para HomePage"
                width={40}
                height={40}
              />
            </button>
          </Link>
          <Image
            src={episode.thumbnail}
            alt={episode.title}
            width={656}
            height={160}
            objectFit="cover"
          />
          <button type="button" onClick={() => playEpisode(episode)}>
            <Image src={playImg} alt="Tocar episódio" height={24} width={24} />
          </button>
        </div>

        <header>
          <h1>{episode.title}</h1>
          <span>{episode.members}</span>
          <span> {episode.publishedAt}</span>
          <span>{episode.durationAsString}</span>
        </header>

        <div
          className={styles.episodeDescription}
          dangerouslySetInnerHTML={{ __html: episode.description }}
        />
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc',
    },
  })

  const paths = data.map((episode) => {
    return {
      params: {
        slug: episode.id,
      },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params
  const { data } = await api.get(`/episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
    thumbnail: data.thumbnail,
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    url: data.file.url,
    members: data.members,
    description: data.description,
  }

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
