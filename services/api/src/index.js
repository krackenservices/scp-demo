import express from 'express'
import cors from 'cors'
import pg from 'pg'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// Database connection (optional - gracefully handles missing DB)
let pool = null
const DATABASE_URL = process.env.DATABASE_URL

if (DATABASE_URL) {
    pool = new pg.Pool({ connectionString: DATABASE_URL })
}

// Health check endpoint
app.get('/api/health', async (req, res) => {
    const health = {
        service: 'demo-api',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        dependencies: {
            database: 'unknown'
        }
    }

    // Check database connection
    if (pool) {
        try {
            await pool.query('SELECT 1')
            health.dependencies.database = 'connected'
        } catch (err) {
            health.dependencies.database = 'disconnected'
        }
    } else {
        health.dependencies.database = 'not-configured'
    }

    res.json(health)
})

// Sample data endpoint
app.get('/api/items', async (req, res) => {
    if (pool) {
        try {
            const result = await pool.query('SELECT * FROM items LIMIT 10')
            return res.json(result.rows)
        } catch (err) {
            // Table might not exist, return sample data
        }
    }

    // Return sample data if DB not available
    res.json([
        { id: 1, name: 'Item 1', description: 'First sample item' },
        { id: 2, name: 'Item 2', description: 'Second sample item' },
        { id: 3, name: 'Item 3', description: 'Third sample item' }
    ])
})

// Create item endpoint
app.post('/api/items', async (req, res) => {
    const { name, description } = req.body

    if (pool) {
        try {
            const result = await pool.query(
                'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
                [name, description]
            )
            return res.status(201).json(result.rows[0])
        } catch (err) {
            // Fallback if table doesn't exist
        }
    }

    res.status(201).json({ id: Date.now(), name, description })
})

app.listen(PORT, () => {
    console.log(`🚀 API server running on http://localhost:${PORT}`)
    console.log(`   Health: http://localhost:${PORT}/api/health`)
})
