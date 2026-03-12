import { useState, type FormEvent, type ChangeEvent } from 'react'
import './App.css'

const apiBase = import.meta.env.VITE_API_URL ?? ''

function App() {
  const [url, setUrl] = useState('')
  const [shortenedUrl, setShortenedUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setShortenedUrl('')
    setIsLoading(true)

    try {
      const res = await fetch(`${apiBase}/api/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = (await res.json()) as { shortUrl?: string; error?: string }

      if (!res.ok) {
        setError(data.error ?? 'Failed to shorten URL')
        return
      }
      setShortenedUrl(data.shortUrl ?? '')
    } catch {
      setError('Network error. Is the backend running?')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Failed to copy to clipboard')
    }
  }

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="url"
          value={url}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
          placeholder="Enter your long URL here"
          required
          className="input"
        />
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>

      {error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}

      {shortenedUrl && (
        <div className="result">
          <h2>Your shortened URL:</h2>
          <div className="url-container">
            <input
              type="text"
              value={shortenedUrl}
              readOnly
              className="shortened-url"
            />
            <button
              type="button"
              onClick={copyToClipboard}
              className="copy-button"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
