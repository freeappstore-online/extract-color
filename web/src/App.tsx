import { useState, useEffect } from 'react'
import { initApp } from '@freeappstore/sdk'
import { Shell, BuildInfo } from '@freeappstore/sdk/ui'
import { ColorCountSelector } from './components/ColorCountSelector'
import { ImageDropzone } from './components/ImageDropzone'
import { ColorResults } from './components/ColorResults'
import { extractColors, type ExtractedPalette } from './lib/extractColors'

const fas = initApp({ appId: 'extract-color' })

export default function App() {
  const [numColors, setNumColors] = useState(5)
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null)
  const [palette, setPalette] = useState<ExtractedPalette | null>(null)

  useEffect(() => {
    if (!imgEl) {
      setPalette(null)
      return
    }
    const result = extractColors(imgEl, numColors)
    setPalette(result)
  }, [imgEl, numColors])

  return (
    <Shell app={fas} appName="Extract Color">
      <div
        className="flex flex-1 flex-col items-center px-4 py-4 sm:py-8 gap-4 sm:gap-6 w-full ls-compact"
        style={{ maxWidth: '36rem', margin: '0 auto' }}
      >
        <div className="text-center ls-hide">
          <h1 className="display-font text-3xl font-bold text-[var(--ink)]">Extract Colors</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Drop, select, or paste an image to extract its dominant palette
          </p>
        </div>

        <ColorCountSelector value={numColors} onChange={setNumColors} />
        <ImageDropzone onImageLoaded={setImgEl} imgEl={imgEl} />
        {palette && <ColorResults primary={palette.primary} others={palette.others} />}
      </div>
      <div className="flex justify-center pb-4">
        <a
          href="https://freeappstore.online"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
        >
          Built for freeappstore.online
        </a>
      </div>
      <BuildInfo />
    </Shell>
  )
}
