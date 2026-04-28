import crypto from 'crypto';

export default async function handler(req, res) {
  const { e, p } = req.body; // p is a Md5 hash

  const user = await db.query('SELECT * FROM users WHERE email = $1', [e]);

  if (user.rows.length === 0) {
    return res.status(401).json({ success: false, message: 'user not exist' });
  }

  // user.rows[0].password is a Md5 hash
  if (user.rows[0].password === p) {
    const { password, ...safeUser } = user.rows[0];
    return res.json({ success: true, user: safeUser });
  } else {
    return res.status(401).json({ success: false, message: 'wroing password' });
  }
}