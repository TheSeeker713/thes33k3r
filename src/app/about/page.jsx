import AboutSeeker from '@/components/AboutSeeker'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VideoBackground from '@/components/VideoBackground'

export const metadata = {
  title: 'About The S33K3R | The Transmission',
  description: 'Learn about The S33K3R and the multiversal war against The Null Dominion.',
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0d0a08] text-stone-200 overflow-x-hidden">
      {/* Background Video Layer */}
      <VideoBackground />
      
      {/* Navigation Bar - Fixed */}
      <Navbar />

      {/* Main Content Container */}
      <main className="relative z-10 flex flex-col min-h-screen pt-20 md:pt-24 pb-24">
        {/* Header - Sticky below navbar */}
        <header className="sticky top-16 md:top-20 z-40 text-center py-4 md:py-6 bg-[#0d0a08]/60 backdrop-blur-sm">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-mono text-amber-500 text-glow tracking-widest">
            THE S33K3R TRANSMISSION
          </h1>
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mt-2"></div>
        </header>
        
        {/* About Content */}
        <section className="scroll-mt-24">
          <AboutSeeker />
        </section>
      </main>

      {/* Footer - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0a08]/95 backdrop-blur-sm">
        <Footer />
      </div>
    </div>
  )
}
