import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import assert from 'node:assert/strict'
const root = 'out'
const headers = fs.readFileSync(`${root}/_headers`,'utf8')
const entries = fs.readdirSync('src/app/devlog/data').filter(file => /^devlogs\d{2}\.json$/.test(file))
 .map(file => JSON.parse(fs.readFileSync(`src/app/devlog/data/${file}`, 'utf8')))
 .sort((a,b) => Date.parse(a.startDate) - Date.parse(b.startDate) || Number(a.number) - Number(b.number))
const markdownSlugs = fs.readdirSync('public/devlog').filter(file => file.endsWith('.md')).map(file => file.slice(0,-3)).sort()
assert(entries.length > 0, 'The Archive is empty')
assert.deepEqual(entries.map(entry => entry.slug).sort(), markdownSlugs, 'Archive metadata and reading copies differ')
assert.equal(new Set(entries.map(entry => entry.slug)).size, entries.length, 'Duplicate Archive entries')
const archiveHtml = fs.readFileSync(`${root}/devlog.html`, 'utf8')
const renderedOrder = [...archiveHtml.matchAll(/<a\b[^>]*class="devlog-row"[^>]*>/g)].map(match => match[0].match(/href="\/devlog\/(devlog\d{2})"/)?.[1])
assert.deepEqual(renderedOrder, entries.map(entry => entry.slug), 'The published Archive is not oldest first')
const sitemap = fs.readFileSync(`${root}/sitemap.xml`, 'utf8')
for (const entry of entries) {
 assert(Number.isFinite(Date.parse(entry.startDate)) && Date.parse(entry.startDate) <= Date.parse(entry.endDate), `Invalid work dates: ${entry.slug}`)
 const markdown = fs.readFileSync(`public/devlog/${entry.slug}.md`, 'utf8')
 assert.equal(markdown, fs.readFileSync(`documents/devlog/${entry.slug}.md`, 'utf8'), `Reading copies differ: ${entry.slug}`)
 assert.equal(markdown.split('\n')[0], `# ${entry.title}`, `Title differs: ${entry.slug}`)
 assert(markdown.trim().split('\n').length <= 111, `Entry exceeds 111 lines: ${entry.slug}`)
 const sources = markdown.split('\n## Sources\n')
 assert.equal(sources.length, 2, `Missing or duplicate bottom source section: ${entry.slug}`)
 assert(!/^## /m.test(sources[1]), `Content follows the source section: ${entry.slug}`)
 assert(/https:\/\/github\.com\/TheSeeker713\/thes33k3r\/commit\/[a-f0-9]{40}/.test(sources[1]), `Missing commit citation: ${entry.slug}`)
 assert(/https:\/\/github\.com\/TheSeeker713\/thes33k3r\/blob\/[a-f0-9]{40}\//.test(sources[1]), `Missing pinned site source: ${entry.slug}`)
 const html = fs.readFileSync(`${root}/devlog/${entry.slug}.html`, 'utf8')
 const byline = html.match(/<p class="article-byline">([\s\S]*?)<\/p>/)?.[1].replace(/<[^>]*>/g, '')
 assert.equal(byline, 'By Jeremy Robards, CTO of Mycelia Interactive LLC', `Missing article byline: ${entry.slug}`)
 assert(html.includes(`name="author" content="${entry.author}"`), `Missing author metadata: ${entry.slug}`)
 assert(sitemap.includes(`/devlog/${entry.slug}</loc>`), `Missing sitemap entry: ${entry.slug}`)
}
const routes = ['index','about','collective','games','games/bank','devlog',...entries.map(entry => `devlog/${entry.slug}`)]
assert(!fs.readdirSync(root, {recursive:true}).some(file => /(?:^|\/)(?:contest|multiplayer)[^/]*\.html$/.test(file)), 'Unexpected contest or multiplayer route')
for (const route of routes) {
 const html = fs.readFileSync(`${root}/${route}.html`,'utf8')
 if (route !== 'games/bank') {
  assert(html.includes('Created by Jeremy Robards'),`Missing footer: ${route}`)
  assert(html.includes('data-theme="light"'),`Light mode missing: ${route}`)
 }
 for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
  if (/\bsrc\s*=/.test(match[1]) || !match[2]) continue
  const hash = crypto.createHash('sha256').update(match[2]).digest('base64')
  assert(headers.includes(`sha256-${hash}`),`Missing CSP script hash: ${route}`)
 }
 for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)/g)) {
  const asset = match[1]
  if (asset.startsWith('//')) continue
  const full = path.join(root,decodeURIComponent(asset))
  assert(fs.existsSync(full) || fs.existsSync(`${full}.html`),`Missing local resource ${asset} in ${route}`)
 }
}
assert(fs.readFileSync(`${root}/_redirects`,'utf8').includes('/bank /games/bank 301'))
assert(fs.existsSync(`${root}/rooms/safe_open.webp`),'Missing Bank reward image')
assert(fs.existsSync(`${root}/.well-known/security.txt`),'Missing security contact')
assert(!headers.includes("script-src 'self' 'unsafe-inline'"),'Unsafe script policy')
console.log(`Verified ${routes.length} exported pages, ${entries.length} chronological sourced articles, synchronized reading copies, bylines, sitemap, resources, footer, light default, CSP hashes, Bank redirect and security contact.`)
