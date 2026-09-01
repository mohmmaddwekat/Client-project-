const ALLOWED_HOSTS = new Set([
  'client-project-smoky-alpha.vercel.app',
  'mohmmaddwekat.github.io'
]);

export default function handler(req, res) {
  const lead = String(req.query.lead || 'unknown').slice(0, 120);
  const campaign = String(req.query.campaign || 'website-sales').slice(0, 120);
  const rawUrl = String(req.query.url || '');

  let target;
  try {
    target = new URL(rawUrl);
  } catch {
    return res.status(400).send('Invalid destination');
  }

  if (target.protocol !== 'https:' || !ALLOWED_HOSTS.has(target.hostname)) {
    return res.status(400).send('Destination not allowed');
  }

  console.log(JSON.stringify({ event: 'website_click', lead, campaign, target: target.toString(), ts: new Date().toISOString(), ua: req.headers['user-agent'] || '' }));
  res.setHeader('Cache-Control', 'no-store');
  res.redirect(302, target.toString());
}
