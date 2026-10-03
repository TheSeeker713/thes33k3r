// Fresh response nonces let Cloudflare bot detection coexist with a strict script policy.
const commonHeaders = {
 'X-Content-Type-Options': 'nosniff',
 'X-Frame-Options': 'DENY',
 'Referrer-Policy': 'strict-origin-when-cross-origin',
 'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
 'Strict-Transport-Security': 'max-age=2592000',
}
export async function onRequest(context) {
 const url = new URL(context.request.url)
 if (url.pathname === '/bank' || url.pathname === '/bank/') {
  return new Response(null, {status:301, headers:{...commonHeaders, Location:new URL('/games/bank', url).href}})
 }
 const request = new Request(context.request)
 request.headers.delete('If-None-Match')
 request.headers.delete('If-Modified-Since')
 const response = await context.next(request)
 if (!response.headers.get('Content-Type')?.includes('text/html')) return response
 const bytes = crypto.getRandomValues(new Uint8Array(24))
 const nonce = btoa(String.fromCharCode(...bytes))
 const secured = new Response(response.body, response)
 for (const [name,value] of Object.entries(commonHeaders)) secured.headers.set(name,value)
 secured.headers.set('Content-Security-Policy', `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data: https://i.ytimg.com; media-src 'self'; font-src 'self'; style-src 'self' 'unsafe-inline'; frame-src 'self' https://www.youtube-nocookie.com https://challenges.cloudflare.com; connect-src 'self' https://cloudflareinsights.com; script-src 'self' 'nonce-${nonce}' https://static.cloudflareinsights.com https://challenges.cloudflare.com; upgrade-insecure-requests`)
 // Never reuse a nonce through browser or shared HTML caches.
 secured.headers.set('Cache-Control','no-store')
 secured.headers.delete('ETag')
 secured.headers.delete('Last-Modified')
 return new HTMLRewriter().on('script', {element(element) {element.setAttribute('nonce',nonce)}}).transform(secured)
}
