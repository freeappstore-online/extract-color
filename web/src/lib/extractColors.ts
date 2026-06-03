import { getPaletteSync } from 'colorthief'

export interface ExtractedColor {
  r: number
  g: number
  b: number
  hex: string
}

export interface ExtractedPalette {
  primary: ExtractedColor
  others: ExtractedColor[]
}

export function extractColors(img: HTMLImageElement, count: number): ExtractedPalette | null {
  const colors = getPaletteSync(img, { colorCount: count })
  if (!colors || colors.length === 0) return null

  const mapped: ExtractedColor[] = colors.map(c => {
    const { r, g, b } = c.rgb()
    return { r, g, b, hex: c.hex() }
  })

  return { primary: mapped[0], others: mapped.slice(1) }
}
