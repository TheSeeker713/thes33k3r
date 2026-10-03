import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
const output = 'out'
const common = `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Strict-Transport-Security: max-age=2592000

`
const base = "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data: https://i.ytimg.com; media-src 'self'; font-src 'self'; style-src 'self' 'unsafe-inline'; frame-src https://www.youtube-nocookie.com; connect-src 'self'; upgrade-insecure-requests; script-src 'self' https://static.cloudflareinsights.com"
let rules = common
let count = 0
function scan(dir) {
 for (const file of fs.readdirSync(dir,{withFileTypes:true})) {
  const full = path.join(dir,file.name)
  if (file.isDirectory()) { scan(full); continue }
  if (!file.name.endsWith('.html')) continue
  const html = fs.readFileSync(full,'utf8')
  const hashes = new Set()
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
   if (/\bsrc\s*=/.test(match[1]) || !match[2]) continue
   hashes.add(`'sha256-${crypto.createHash('sha256').update(match[2]).digest('base64')}'`)
  }
  const csp = `${base} ${[...hashes].join(' ')};`
  if (csp.length + 30 > 2000) throw new Error(`Cloudflare header line too long: ${full}`)
  const relative = '/' + path.relative(output,full).replaceAll(path.sep,'/')
  const route = relative === '/index.html' ? '/' : relative.replace(/\.html$/,'').replace(/\/index$/,'/')
  for (const url of new Set([route,relative, route !== '/' && !route.endsWith('/') ? route+'/' : route])) {
   rules += `${url}\n  Content-Security-Policy: ${csp}\n\n`
   count++
  }
 }
}
scan(output)
if (count > 99) throw new Error('Cloudflare Pages header rule limit exceeded')
fs.writeFileSync(path.join(output,'_headers'),rules)
console.log(`Generated CSP hashes and security headers for ${count} routes.`)
