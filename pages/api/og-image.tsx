import { NextRequest } from 'next/server'
import { ImageResponse } from '@vercel/og'
import { NEXT_PUBLIC_SITE_TITLE } from '../../app/server-constants'
import { Post } from '../../lib/notion/interfaces'

export const config = { runtime: 'experimental-edge' }

const logoNT = '<svg viewBox="0 0 128 128" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421"><path d="M128 9.788C128 4.386 123.614 0 118.212 0H9.788C4.386 0 0 4.386 0 9.788v108.424C0 123.614 4.386 128 9.788 128h108.424c5.402 0 9.788-4.386 9.788-9.788V9.788Z" style="fill:#303aa5"/><path d="M7.961 112.175V43.739s2.502-11.265 9.727-16.778c5.405-4.125 10.119-6.918 20.065-7.159 10.811-.261 17.128 3.628 22.779 9.036 5.652 5.409 7.663 13.775 7.911 14.901.449 2.04 0 61.655 0 61.655l-14.797 6.781V43.739s-1.843-9.745-7.691-12.215c-5.847-2.47-12.366-2.451-16.287.516-3.921 2.967-7.046 8.322-7.046 11.699v61.655l-14.661 6.781ZM80.309 43.739l11.191.051.339-19.362 10.034-4.638h4.88v23.949h15.217l-4.51 10.096h-10.707v51.622l-14.914 6.718v-58.34H76.342l3.967-10.096Z" style="fill:#fb3f1c"/></svg>'

const ApiOgImage = async function(req: NextRequest) {
  if (req.method !== 'GET') {
    throw new Error(`GET method only allowed. method: ${req.method}`)
  }

  const { searchParams } = new URL(req.url);

  if (!searchParams.has('slug')) {
    throw new Error('No slug in searchParams.')
  }

  const slug = searchParams.get('slug')

  const url = process.env.VERCEL === '1' ? `https://${process.env.VERCEL_URL}` : `http://localhost:${process.env.PORT || 3000}`

  const post: Post = await (await fetch(new URL(`/api/posts/${slug}`, url))).json()
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
          <img src={post.OGImage} alt='og-image'/>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }

  const fontURL = new URL('../../assets/HigashiOmeGothic.woff', import.meta.url)
  const fontData = await (await fetch(fontURL)).arrayBuffer()

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          backgroundColor: '#fff',
          backgroundSize: '100% 100%',
          width: '1200px',
          height: '630px',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
        }}
      >
        <div
          style={{
            display: 'flex',
            backgroundColor: '#fff',
            backgroundSize: '100% 100%',
            width: '1140px',
            height: '570px',
            margin: 'auto',
            borderRadius: '28px',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              backgroundColor: '#fff',
              width: '1040px',
              height: '490px',
              margin: 'auto',
              fontSize: '78px',
              textAlign: 'left',
              lineHeight: '130%',
              overflow: 'hidden',
              justifyContent: 'center',
              flexDirection: 'column',
              flexWrap: 'nowrap',
            }}
          >
            {post.Title}
          </div>
          <div
            style={{
              display: 'flex',
              backgroundColor: '#fff',
              width: '1040px',
              height: '100px',
              margin: 'auto',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexDirection: 'row',
              flexWrap: 'nowrap',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                backgroundColor: '#fff',
                width: '640px',
                height: '64px',
                margin: 'auto',
                fontSize: '42px',
                color: '#555',
                overflow: 'hidden',
              }}
            >
              {NEXT_PUBLIC_SITE_TITLE}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                width: '150px',
                height: '100px',
                margin: 'auto',
              }}
            >
              <img src={`data:image/svg+xml,${encodeURIComponent(logoNT)}`} width={72} height={72} alt="logo" />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'HigashiOmeGothic',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  )
}

export default ApiOgImage