import { useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [shortenedUrl, setShortenedUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setShortenedUrl('something');
    // Simulate API call
    // setTimeout(() => {
    //   setShortenedUrl()
    //   setIsLoading(false)
    // }, 1000)

    
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl)
  }

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your long URL here"
          required
          className="input"
        />
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>

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
            <button onClick={copyToClipboard} className="copy-button">
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App