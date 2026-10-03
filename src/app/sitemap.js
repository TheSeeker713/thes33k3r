import { getDevlogs } from '@/lib/devlogs'
export const dynamic = 'force-static'
export default async function sitemap() {
 const devlogs = await getDevlogs()
 const routes = ['', '/about', '/collective', '/games', '/games/bank', '/devlog', ...devlogs.map(log => `/devlog/${log.slug}`)]
 return routes.map(route => ({url:`https://www.thes33k3r.com${route}`, changeFrequency:'monthly', priority:route === '' ? 1 : 0.6}))
}
