# Open Acre — Septic Contractor Directory & Tools

Multi-market platform for septic services in Washington State.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
openacre/
├── pages/               # Next.js pages (routes)
├── config/              # Market definitions and settings
├── styles/              # Global CSS
├── public/              # Static assets (favicon, images)
└── README.md
```

## Multi-Market Setup

All market data is centralized in `config/markets.js`. To add a new market:

1. Add entry to `markets` object in `config/markets.js`
2. Set `name`, `cities`, `compliance` rules, etc.
3. Pages auto-detect market from URL slug

Example: `/septic-contractors/kitsap-county-wa/` loads Kitsap County config.

## Tools Roadmap

- [ ] Tool 1: Pump-Out Interval Calculator
- [ ] Tool 2: Contractor License Verifier (L&I API integration)
- [ ] Tool 3: Property Transfer Compliance Checker
- [ ] Tool 4: Septic System Failure Risk Assessment
- [ ] Tool 5: WA County Septic Requirement Lookup
- [ ] Tool 6: Septic System Age & Replacement Cost Estimator
- [ ] Tool 7: Drainfield Size Calculator
- [ ] Tool 8: Septic vs. Sewer Connection Cost Comparison
- [ ] Tool 9: Contractor Bid Analyzer
- [ ] Tool 10: Homeowner Septic Maintenance Calendar Generator

## Deployment

Deploy to Vercel:

```bash
vercel
```

Or connect GitHub repo for automatic deployments on push.

## SEO & Analytics

- Google Search Console: Submit sitemap at `/sitemap.xml`
- Plausible Analytics: Configured in `_document.js`
- Structured data: JSON-LD schema on contractor and tool pages

## License

ISC
