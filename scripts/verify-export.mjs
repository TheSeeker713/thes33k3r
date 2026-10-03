import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import assert from 'node:assert/strict'
const root = 'out'
const headers = fs.readFileSync(`${root}/_headers`,'utf8')
const routes = ['index','about','collective','games','games/bank','devlog',...Array.from({length:8},(_,i)=>`devlog/devlog${String(i+1).padStart(2,'0')}`)]
for (const route of routes) {
 const html = fs.readFileSync(`${root}/${route}.html`,'utf8')
 assert(!html.includes('contest multiplayer'),`Unexpected contest page: ${route}`)
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
console.log(`Verified ${routes.length} exported pages, local resources, footer, light default, CSP hashes, Bank redirect and security contact.`)
