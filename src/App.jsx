import VideoBackground from './components/VideoBackground'
import CRTOverlay from './components/CRTOverlay'
import Message from './components/Message'
import PuzzleGame from './components/PuzzleGame'
import Footer from './components/Footer'

function App() {
  return (
    <div className="relative min-h-screen flex flex-col bg-black text-white overflow-x-hidden">
      {/* Background Video Layer */}
      <VideoBackground />
      
      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="text-center py-4 md:py-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-mono text-green-400 text-glow tracking-widest">
            THE S33K3R TRANSMISSION
          </h1>
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto mt-2"></div>
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
