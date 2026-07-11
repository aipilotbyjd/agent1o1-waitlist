# Agent1o1 — Waitlist site

A professional waitlist landing site for **Agent1o1** — a canvas where you drag steps onto a grid and some of those steps can think.

Static HTML/CSS/JS. No build step. Brand color `#f0f539` on a warm, Claude-inspired neutral palette.

## Pages

| Page | File | Purpose |
|------|------|---------|
| **Variant A — The Outcome** | `index.html` | "Wake up to work that's already done." Sells the after-state. |
| **Variant B — The Pain** | `variant-b.html` | "You're not automating anything. You're the automation." |
| **Variant C — The Tool** | `variant-c.html` | "Two hundred AI tools. One canvas." Leads with a free directory. |
| About | `about.html` | Founder note. |
| Contact | `contact.html` | Emails + legal details. |
| Terms of Service | `terms.html` | |
| Privacy Policy | `privacy.html` | |

Only the hero and first section differ across A/B/C — everything below the fold is identical, so an A/B test tells you *why* one won. Switch between variants using the `A · B · C` pill in the nav.

## Run locally

Just open `index.html`, or:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Notes

- Placeholders in square brackets (`[LEGAL ENTITY NAME]`, `[DATE]`, etc.) in the legal pages are filled in before launch.
- The founder photo and waitlist backend are placeholders — the form is front-end only.
