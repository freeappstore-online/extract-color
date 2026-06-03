import { useRef, useEffect, useState, useCallback } from 'react'

interface Props {
  onImageLoaded: (img: HTMLImageElement) => void
  imgEl: HTMLImageElement | null
}

export function ImageDropzone({ onImageLoaded, imgEl }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const loadFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) return
      const url = URL.createObjectURL(file)
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        setPreview(url)
        onImageLoaded(img)
      }
      img.src = url
    },
    [onImageLoaded],
  )

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return
      for (const item of Array.from(items)) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile()
          if (file) loadFile(file)
          break
        }
      }
    }
    window.addEventListener('paste', handlePaste)
    return () => window.removeEventListener('paste', handlePaste)
  }, [loadFile])

  useEffect(() => {
    if (!imgEl) {
      setPreview(null)
    }
  }, [imgEl])

  return (
    <div
      className={`w-full rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ls-dropzone ${
        dragging
          ? 'border-[var(--accent)] bg-[var(--accent-soft)] scale-[1.01]'
          : 'border-[var(--line-strong)] hover:border-[var(--accent)] bg-[var(--paper-deep)]'
      }`}
      style={{ minHeight: preview ? 'auto' : '180px' }}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => {
        e.preventDefault()
        setDragging(false)
        const file = e.dataTransfer.files[0]
        if (file) loadFile(file)
      }}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => {
          const f = e.target.files?.[0]
          if (f) loadFile(f)
          e.target.value = ''
        }}
      />
      {preview ? (
        <div className="relative group">
          <img src={preview} alt="Selected" className="w-full max-h-72 object-contain" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full transition-opacity">
              Change image
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-3 p-10">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <p className="text-[var(--muted)] text-sm text-center leading-relaxed">
            Drop an image here, click to browse,<br />
            or press <kbd className="bg-[var(--paper)] border border-[var(--line-strong)] px-1.5 py-0.5 rounded text-xs font-mono">⌘V</kbd> / <kbd className="bg-[var(--paper)] border border-[var(--line-strong)] px-1.5 py-0.5 rounded text-xs font-mono">Ctrl+V</kbd> to paste
          </p>
        </div>
      )}
    </div>
  )
}
