import Navbar from './Navbar'
import Footer from './Footer'
export default function SiteShell({ children, className = '' }) {
  return <div className={`site-shell ${className}`}><Navbar /><main id="main-content">{children}</main><Footer /></div>
}
