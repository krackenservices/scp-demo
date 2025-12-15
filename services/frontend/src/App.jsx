import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function App() {
    const [status, setStatus] = useState('loading')
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(`${API_URL}/api/health`)
            .then(res => res.json())
            .then(data => {
                setData(data)
                setStatus('connected')
            })
            .catch(err => {
                setError(err.message)
                setStatus('error')
            })
    }, [])

    return (
        <div className="container">
            <h1>🚀 SCP Demo</h1>

            <div className="status">
                <div className={`status-dot ${status}`}></div>
                <span>
                    {status === 'loading' && 'Connecting to API...'}
                    {status === 'connected' && 'Connected to API'}
                    {status === 'error' && 'API Unavailable'}
                </span>
            </div>

            <p className="message">
                This is a 3-tier application demonstrating the System Capability Protocol.
                Each service has an <code>scp.yaml</code> manifest describing its architecture.
            </p>

            {data && (
                <div className="data-card">
                    <h3>API Response</h3>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}

            {error && (
                <div className="data-card">
                    <h3>Start the API</h3>
                    <pre>cd services/api && npm run dev</pre>
                </div>
            )}

            <span className="badge">Frontend • Tier 2</span>
        </div>
    )
}
