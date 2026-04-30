import { useCallback } from 'react'
import { useSearchParams } from 'react-router'

/**
 * Read and write a single query-string param while preserving every other
 * param on the URL. Passing `null` to the setter deletes the param.
 *
 * Updates use `replace: true` so changes don't pollute browser history.
 */
export function useUrlParam(key: string): [string | null, (value: string | null) => void] {
  const [searchParams, setSearchParams] = useSearchParams()
  const value = searchParams.get(key)

  const setValue = useCallback(
    (next: string | null) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev)
          if (next == null) params.delete(key)
          else params.set(key, next)
          return params
        },
        { replace: true },
      )
    },
    [key, setSearchParams],
  )

  return [value, setValue]
}
