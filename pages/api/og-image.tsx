import { NextRequest } from 'next/server'
import { ImageResponse } from '@vercel/og'
import { getPostBySlug } from '../../lib/notion/client'
import { NEXT_PUBLIC_SITE_TITLE } from '../../app/server-constants'

export const config = { runtime: 'experimental-edge' }

const ApiOgImage = async function(req: NextRequest) {
  if (req.method !== 'GET') {
    throw new Error(`GET method only allowed. method: ${req.method}`)
  }

  const { searchParams } = new URL(req.url);

  if (!searchParams.has('slug')) {
    throw new Error('No slug in searchParams.')
  }

  const slug = searchParams.get('slug')

  const post = await getPostBySlug(slug)
  if (!post) {
    throw new Error(`post not found. slug: ${slug}`)
  }

  if (post.OGImage) {
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            backgroundColor: '#fff',
            backgroundSize: '100% 100%',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={post.OGImage} />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }

  const fontURL = new URL('../../assets/NotoSansJP-Medium.woff', import.meta.url)
  const imageURL = new URL('../../assets/default-og-image.svg', import.meta.url)

  const fontData = await (await fetch(fontURL)).arrayBuffer()

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          backgroundImage: `url(${imageURL.toString()})`,
          backgroundColor: '#fff',
          backgroundSize: '100% 100%',
          width: '100%',
          height: '100%',
          textAlign: 'left',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '800px',
            height: '380px',
            margin: '70px auto 60px',
            fontSize: 80,
            fontStyle: 'normal',
            color: '#333',
            lineHeight: 1.3,
            wordWrap: 'break-word',
          }}
        >
          {post.Title.slice(0, 30)}
        </div>
        <div
          style={{
            display: 'flex',
            width: '800px',
            height: '60px',
            margin: '0 35px 0',
            fontSize: 48,
            fontStyle: 'normal',
            color: '#666',
            lineHeight: 1.3,
            wordWrap: 'break-word',
          }}
        >
          ✏️ {NEXT_PUBLIC_SITE_TITLE}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'NotoSansJP',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  )
}

export default ApiOgImage