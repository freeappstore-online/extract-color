interface Props {
  value: number
  onChange: (n: number) => void
}

const COUNTS = [3, 4, 5, 6, 7, 8, 9, 10]

export function ColorCountSelector({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
      <span className="text-sm font-medium text-[var(--muted)]">Colors</span>
      <div className="flex gap-1">
        {COUNTS.map(n => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${
              value === n
                ? 'bg-[var(--accent)] text-white shadow-sm'
                : 'bg-[var(--paper-deep)] text-[var(--ink)] hover:bg-[var(--line-strong)]'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  )
}
