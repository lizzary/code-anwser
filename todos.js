import db from '../../lib/db';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const result = await db.query('SELECT * FROM todos');
      return res.status(200).json(result.rows);
    }

    if (req.method === 'POST') {
      const { text } = req.body;
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Invalid text' });
      }
      const result = await db.query(
        'INSERT INTO todos (text, done) VALUES ($1, false) RETURNING *',
        [text]
      );
      return res.status(201).json(result.rows[0]);
    }

    // 其他方法
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}