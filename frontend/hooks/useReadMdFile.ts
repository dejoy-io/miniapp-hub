import { parse } from 'marked'
import { useEffect, useState } from 'react'

export const useReadMdFile = (path: string) => {
  const [data, setData] = useState('')

  const render = async () => {
    if (!path) return ''
    try {
      const result = await fetch(`${path}?t=${Math.floor(Date.now() / 60_000)}`)
      const text = await result.text()
      setData(await parse(text))
    } catch (err) {
      console.log('useReadMdFile render error:', err)
      setData('')
    }
  }

  useEffect(() => {
    render()
  }, [path])

  return { data }
}
