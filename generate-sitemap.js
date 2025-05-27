// generate-sitemap.js
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
// import { posts } from './src/assets/data/articles.json'
import posts from './src/assets/data/articles.json' assert { type: 'json' };

// pour __dirname en ESM :
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'https://temps-cuisson-air-fryer.netlify.app'

const routes = [
  '/',
  '/calculateur-cuisson-air-fryer',
  '/fonctionnalites',
  '/blog',
  '/politique-de-confidentialite'
]

const blogRoutes = posts.map(post => `/blog/${post.slug}`)

const allRoutes = [...routes, ...blogRoutes]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>
`

fs.writeFileSync(path.resolve(__dirname, 'public/sitemap.xml'), xml)
console.log('✅ sitemap.xml généré avec succès')
