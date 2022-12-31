'use client'

import React from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import { Player } from 'video-react'
import { isYouTubeURL, parseYouTubeVideoId } from '../../lib/blog-helpers'

import 'video-react/dist/video-react.css'
import styles from '../../styles/notion-block.module.scss'

const Video = ({ block }) => {
  const block_type = block.Video.Type

  let url: URL
  let video_url: string

  switch (block_type) {
    case 'external':
        try {
          url = new URL(block.Video.External.Url)
        } catch {
          return null
        }

        if (!isYouTubeURL(url) && block_type === 'external') {
          return null
        }

        const onPlayerReady: YouTubeProps['onReady'] = (event) => {
          event.target.pauseVideo()
        }
        const opts: YouTubeProps['opts'] = {
          height: '390',
          width: '640',
          playerVars: {
            autoplay: 1,
          },
        }

        const videoId = parseYouTubeVideoId(url)
        if (videoId === '') {
          return null
        }

        return (
          <div className={styles.video}>
            <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} className={styles.youtube} />
          </div>
        )

    case 'file':
      video_url = block.Video.File.Url
      return (
        <div className={styles.video}>
          <Player>
            <source src={video_url} width='100%' height='100%' />
          </Player>
        </div>
      )

    default:
      break;
  }
}

export default Video
