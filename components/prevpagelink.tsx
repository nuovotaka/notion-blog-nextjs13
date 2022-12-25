'use client'

import { useRouter } from "next/navigation"

export const PrevPageLink = () => {
  const router = useRouter()
  return (
    <div>
      <a onClick={() => router.back()}>← Newer Page</a>
    </div>
  )
}