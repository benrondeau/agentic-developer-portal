import { useTheme } from '../../hooks/useTheme.ts'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="flex cursor-pointer items-center gap-1.5 rounded-full border border-zinc-600 px-2.5 py-1 select-none"
    >
      <span className="relative h-3.5 w-7 flex-shrink-0 rounded-full bg-zinc-700 transition-colors">
        <span
          className="absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white transition-[left] duration-200"
          style={{ left: isDark ? 16 : 2 }}
        />
      </span>
      <span className="font-mono text-[12px] text-zinc-400">{isDark ? 'light' : 'dark'}</span>
    </button>
  )
}
