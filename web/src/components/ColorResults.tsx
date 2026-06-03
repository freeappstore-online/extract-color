import { useState } from 'react'
import type { ExtractedColor } from '../lib/extractColors'

interface ColorCardProps {
  color: ExtractedColor
  size?: 'large' | 'small'
}

function ColorCard({ color, size = 'small' }: ColorCardProps) {
  const [copied, setCopied] = useState<'hex' | 'rgb' | null>(null)

  const copy = (text: string, label: 'hex' | 'rgb') => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 1500)
  }

  const hexDisplay = color.hex.toUpperCase()
  const rgbDisplay = `${color.r}, ${color.g}, ${color.b}`

  return (
    <div className="rounded-xl overflow-hidden border border-[var(--line)] bg-[var(--paper)] shadow-[var(--shadow-card)]">
      <div
        className={`w-full ${size === 'large' ? 'h-20' : 'h-12'}`}
        style={{ backgroundColor: color.hex }}
      />
      <div className={`flex flex-col ${size === 'large' ? 'gap-2 p-3' : 'gap-1 p-2'}`}>
        <button
          title="Copy HEX"
          onClick={() => copy(hexDisplay, 'hex')}
          className="text-left font-mono text-xs font-semibold text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
        >
          {copied === 'hex' ? '✓ Copied!' : hexDisplay}
        </button>
        <button
          title="Copy RGB"
          onClick={() => copy(`rgb(${color.r}, ${color.g}, ${color.b})`, 'rgb')}
          className="text-left font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          {copied === 'rgb' ? '✓ Copied!' : rgbDisplay}
        </button>
      </div>
    </div>
  )
}

interface Props {
  primary: ExtractedColor
  others: ExtractedColor[]
}

export function ColorResults({ primary, others }: Props) {
  return (
    <div className="w-full space-y-5">
      <div>
        <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-2">
          Primary Color
        </p>
        <ColorCard color={primary} size="large" />
      </div>
      {others.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-2">
            Palette
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {others.map((c, i) => (
              <ColorCard key={i} color={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
