import VideoBackground from './components/VideoBackground'
import CRTOverlay from './components/CRTOverlay'
import Message from './components/Message'
import PuzzleGame from './components/PuzzleGame'
import Footer from './components/Footer'
import FartBubble from './components/FartBubble'
import SpecialMenu from './components/SpecialMenu'

function App() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0d0a08] text-stone-200 overflow-x-hidden">
      {/* Background Video Layer */}
      <VideoBackground />
      
      {/* Hidden Easter Eggs */}
      <FartBubble />
      <SpecialMenu />
      
      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="text-center py-4 md:py-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-mono text-amber-500 text-glow tracking-widest">
            THE S33K3R TRANSMISSION
          </h1>
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mt-2"></div>
        </header>
        
        {/* CRT TV Display */}
        <CRTOverlay />
        
        {/* Message Section */}
        <Message />
        
        {/* Puzzle Game */}
        <PuzzleGame />
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default App
