import { NextRequest } from 'next/server'
import { ImageResponse } from '@vercel/og'
import { NEXT_PUBLIC_SITE_TITLE } from '../../app/server-constants'
import { Post } from '../../lib/notion/interfaces'

export const config = { runtime: 'experimental-edge' }

const logoNT = '<svg width="100%" height="100%" viewBox="0 0 128 128" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><g id="logo"><g><path d="M128,9.788c0,-5.402 -4.386,-9.788 -9.788,-9.788l-108.424,0c-5.402,0 -9.788,4.386 -9.788,9.788l0,108.424c0,5.402 4.386,9.788 9.788,9.788l108.424,0c5.402,0 9.788,-4.386 9.788,-9.788l0,-108.424Z" style="fill:#303aa5;"/><path d="M7.961,112.175l0,-68.436c0,0 2.502,-11.265 9.727,-16.778c5.405,-4.125 10.119,-6.918 20.065,-7.159c10.811,-0.261 17.128,3.628 22.779,9.036c5.652,5.409 7.663,13.775 7.911,14.901c0.449,2.04 0,61.655 0,61.655l-14.797,6.781l0,-68.436c0,0 -1.843,-9.745 -7.691,-12.215c-5.847,-2.47 -12.366,-2.451 -16.287,0.516c-3.921,2.967 -7.046,8.322 -7.046,11.699c0,3.377 0,61.655 0,61.655l-14.661,6.781Z" style="fill:#fb3f1c;"/><path d="M80.309,43.739l11.191,0.051l0.339,-19.362l10.034,-4.638l4.88,0l0,23.949l15.217,0l-4.51,10.096l-10.707,0l0,51.622l-14.914,6.718l0,-58.34l-15.497,0l3.967,-10.096Z" style="fill:#fb3f1c;"/></g></g></svg>'

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

  const fontURL = new URL('../../assets/NotoSansJP-Medium.woff', import.meta.url)
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
              ✏️ {NEXT_PUBLIC_SITE_TITLE}
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
          name: 'NotoSansJP',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  )
}

export default ApiOgImage