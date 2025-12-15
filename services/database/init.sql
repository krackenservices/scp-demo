-- Initialize demo database schema

CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO items (name, description) VALUES
    ('Widget A', 'A high-quality widget for everyday use'),
    ('Gadget B', 'An innovative gadget with smart features'),
    ('Tool C', 'A reliable tool for professionals')
ON CONFLICT DO NOTHING;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_items_name ON items(name);
