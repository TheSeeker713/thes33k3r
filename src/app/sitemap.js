export const dynamic = 'force-static'
export default function sitemap() {
 const routes = ['', '/about', '/collective', '/games', '/games/bank', '/devlog', ...Array.from({length:8}, (_,i) => `/devlog/devlog${String(i+1).padStart(2,'0')}`)]
 return routes.map(route => ({url:`https://www.thes33k3r.com${route}`, changeFrequency:'monthly', priority:route === '' ? 1 : 0.6}))
}
