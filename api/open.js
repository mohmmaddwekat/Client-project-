export default function handler(req, res) {
  const lead = String(req.query.lead || 'unknown').slice(0, 120);
  const campaign = String(req.query.campaign || 'website-sales').slice(0, 120);
  console.log(JSON.stringify({ event: 'email_open', lead, campaign, ts: new Date().toISOString(), ua: req.headers['user-agent'] || '' }));

  const gif = Buffer.from('R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==', 'base64');
  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.status(200).send(gif);
}
