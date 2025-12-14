'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type Phase = 'lobby' | 'transition' | 'game' | 'unlocked'

const LOBBY_BG = '/rooms/banklobby_room.webp'
const GAME_BG = '/rooms/bankvault_room.webp'
const TRANSITION_VIDEO = '/rooms/banklobby_to_bankvault.webm'
const BG_MUSIC = '/rooms/game_assets/music/Echoes in the Static.mp3'
const SOUND_FX = {
  match: '/rooms/game_assets/sound_fx/match.webm',
  lifeLost: '/rooms/game_assets/sound_fx/life_lost.webm',
  gameWon: '/rooms/game_assets/sound_fx/game_won.webm',
  scary: '/rooms/game_assets/sound_fx/scary.webm',
  gameOver: '/rooms/game_assets/sound_fx/game_over.webm',
}

function playSound(src: string) {
  const audio = new Audio(src)
  audio.play().catch(() => {
    // Silence audio errors
  })
}

export default function BankEncounter() {
  const [phase, setPhase] = useState<Phase>('lobby')
  const [fadeBlack, setFadeBlack] = useState(false)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const musicRef = useRef<HTMLAudioElement | null>(null)

  const deck = useMemo(() => buildShuffledDeck(), [])
  const [cards, setCards] = useState(deck)
  const [selection, setSelection] = useState<number[]>([])
  const [lives, setLives] = useState(6)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    const allMatched = cards.every((c) => c.matched)
    if (allMatched && phase === 'game' && !gameOver) {
      playSound(SOUND_FX.gameWon)
      setPhase('unlocked')
    }
  }, [cards, phase, gameOver])

  useEffect(() => {
    if (lives === 0 && phase === 'game') {
      playSound(SOUND_FX.scary)
      setTimeout(() => {
        setGameOver(true)
      }, 4880) // scary.wav duration
    }
  }, [lives, phase])

  function resetGame() {
    const newDeck = buildShuffledDeck()
    setCards(newDeck)
    setSelection([])
    setLives(6)
    setGameOver(false)
  }

  useEffect(() => {
    // ensure video audio is enabled after user gesture
    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.volume = 0.8
    }
  }, [phase])

  useEffect(() => {
    // Background music control: play only during game phase (not gameOver), stop otherwise
    if (phase === 'game' && !gameOver) {
      if (!musicRef.current) {
        musicRef.current = new Audio(BG_MUSIC)
        musicRef.current.loop = true
        musicRef.current.volume = 0.2
      }
      musicRef.current.play().catch(() => {})
    } else {
      if (musicRef.current) {
        musicRef.current.pause()
        musicRef.current.currentTime = 0
      }
    }
  }, [phase, gameOver])

  return (
    <div className="relative w-full h-dvh overflow-hidden font-mono text-amber-500">
      {/* Background for LOBBY and GAME */}
      <AnimatePresence>
        {(phase === 'lobby' || phase === 'game' || phase === 'unlocked') && (
          <motion.div
            key="bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${phase === 'game' ? GAME_BG : LOBBY_BG})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#000',
            }}
          />
        )}
      </AnimatePresence>

      {/* LOBBY overlay */}
      {phase === 'lobby' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-xl w-[90vw] rounded-xl p-6 bg-black/50 backdrop-blur-md border border-amber-600/40 shadow-2xl">
            <h1 className="text-2xl mb-3">Bank Lobby</h1>
            <p className="text-amber-300/90 mb-6">
              The signal leads here. The vault contains the first truth. Breach the lock to recover the protocol.
            </p>
            <div className="flex gap-3 justify-end">
              <Link href="/" className="px-4 py-2 rounded border border-amber-500/60 text-amber-300 hover:bg-amber-500/10 transition-colors">
                abort
              </Link>
              <button
                className="px-4 py-2 rounded bg-amber-600 text-black font-semibold shadow hover:bg-amber-500 transition-colors"
                onClick={() => setPhase('transition')}
              >
                breach
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TRANSITION video overlay */}
      {phase === 'transition' && (
        <div className="absolute inset-0 z-50 bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            className="max-w-full max-h-full object-contain"
            src={TRANSITION_VIDEO}
            autoPlay
            playsInline
            preload="auto"
            onCanPlay={() => {
              if (videoRef.current) {
                videoRef.current.muted = false
                videoRef.current.volume = 0.8
              }
            }}
            onEnded={() => {
              setFadeBlack(true)
              setTimeout(() => {
                setFadeBlack(false)
                setPhase('game')
              }, 350)
            }}
          />
          <AnimatePresence>
            {fadeBlack && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black"
              />
            )}
          </AnimatePresence>
        </div>
      )}

      {/* GAME: Numbers matching */}
      {phase === 'game' && !gameOver && (
        <div className="absolute inset-0 flex items-center justify-center px-4 gap-4">
          <div className="w-full max-w-4xl rounded-2xl p-6 bg-zinc-900/90 border border-amber-700/40 shadow-2xl">
            <h2 className="text-center text-xl mb-4">vault access protocol</h2>
            <p className="text-center text-amber-300/90 mb-6">reveal pairs of matching numbers to unseal the vault</p>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {cards.map((card) => (
                <NumberCard
                  key={card.id}
                  card={card}
                  revealed={card.matched || selection.includes(card.id)}
                  onClick={() => handleCardClick(card.id, cards, selection, setSelection, setCards, setLives)}
                />
              ))}
            </div>
          </div>
          <div className="flex-shrink-0">
            <img 
              src={`/rooms/game_assets/images/lives/bulletchamber_${lives}.webp`}
              alt={`${lives} lives remaining`}
              className="h-32 w-auto"
            />
          </div>
        </div>
      )}

      {/* GAME OVER */}
      {phase === 'game' && gameOver && (
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-xl w-[90vw] rounded-xl p-6 bg-black/60 backdrop-blur-md border border-red-600/40 text-center"
            onAnimationComplete={() => {
              playSound(SOUND_FX.gameOver)
            }}
          >
            <div className="text-3xl mb-3 text-red-500">game over</div>
            <p className="text-amber-300/90 mb-6">vault security triggered. access denied.</p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/"
                className="px-4 py-2 rounded border border-amber-500/60 text-amber-300 hover:bg-amber-500/10 transition-colors"
              >
                quit game
              </Link>
              <button
                onClick={resetGame}
                className="px-4 py-2 rounded bg-amber-600 text-black font-semibold shadow hover:bg-amber-500 transition-colors"
              >
                continue
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* UNLOCKED */}
      {phase === 'unlocked' && (
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-2xl w-full rounded-2xl p-8 bg-black/70 backdrop-blur-md border border-amber-600/50 text-left"
          >
            <div className="text-3xl mb-2 text-amber-400 font-bold">access granted</div>
            <p className="text-amber-300/80 mb-6 text-sm">vault seal disengaged</p>

            <div className="bg-zinc-950/80 rounded-lg p-6 mb-6 border border-amber-700/30">
              <h3 className="text-xl font-mono font-bold text-amber-400 mb-3">⚠️ development notice</h3>
              <p className="text-amber-200/90 mb-4 leading-relaxed">
                THE S33K3R thanks you for playing. Come back soon for a real reward!
              </p>

              <div className="bg-zinc-900/60 rounded p-4 mb-4">
                <h4 className="text-amber-300 font-mono font-semibold mb-3 text-sm">🗺️ roadmap</h4>
                <ul className="text-amber-100/80 text-sm space-y-2 font-mono">
                  <li>✓ Mini-game: Numbers Matching (Complete)</li>
                  <li>🎁 Game Reward: Coming within 7 days</li>
                  <li>💬 Contact Form: Coming soon</li>
                  <li className="text-xs text-amber-300/60 mt-3">
                    Until then, reach out: <a href="mailto:Digiartifact11@gmail.com" className="text-amber-400 hover:text-amber-300 underline">Digiartifact11@gmail.com</a>
                  </li>
                </ul>
              </div>

              <p className="text-amber-200/70 text-xs italic">
                Come back here for more roadmap features, questions, feedback, or ideas.
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <Link
                href="/"
                className="px-4 py-2 rounded border border-amber-500/60 text-amber-300 hover:bg-amber-500/10 transition-colors font-mono text-sm"
              >
                return home
              </Link>
              <button
                onClick={() => setPhase('lobby')}
                className="px-4 py-2 rounded bg-amber-600 text-black font-semibold shadow hover:bg-amber-500 transition-colors font-mono text-sm"
              >
                play again
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(transparent_60%,black_120%)]" />
    </div>
  )
}

type Card = { id: number; value: number; matched: boolean }

function NumberCard({
  card,
  revealed,
  onClick,
}: {
  card: Card
  revealed: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={card.matched || revealed}
      className={`aspect-video md:aspect-square rounded-xl border text-2xl md:text-3xl font-bold flex items-center justify-center transition-colors duration-200 ${
        card.matched
          ? 'border-emerald-500/70 bg-emerald-900/30 text-emerald-300'
          : revealed
            ? 'border-amber-500/80 bg-amber-900/30 text-amber-200'
            : 'border-amber-700/50 bg-zinc-950 text-amber-500 hover:bg-amber-900/20'
      }`}
      whileTap={{ scale: 0.97 }}
      layout
    >
      {revealed || card.matched ? card.value : '▢'}
    </motion.button>
  )
}

function handleCardClick(
  id: number,
  cards: Card[],
  selection: number[],
  setSelection: (ids: number[]) => void,
  setCards: (updater: (cards: Card[]) => Card[]) => void,
  setLives: (updater: (lives: number) => number) => void,
) {
  if (selection.length === 2 || selection.includes(id)) return

  const updatedSelection = [...selection, id]
  setSelection(updatedSelection)

  if (updatedSelection.length === 2) {
    const [firstId, secondId] = updatedSelection
    const firstCard = cards.find((c) => c.id === firstId)
    const secondCard = cards.find((c) => c.id === secondId)
    if (!firstCard || !secondCard) return

    if (firstCard.value === secondCard.value) {
      // match - play sound and mark as matched
      playSound(SOUND_FX.match)
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstId || c.id === secondId ? { ...c, matched: true } : c,
          ),
        )
        setSelection([])
      }, 250)
    } else {
      // mismatch - play sound and lose a life
      playSound(SOUND_FX.lifeLost)
      setTimeout(() => {
        setLives((prev) => Math.max(0, prev - 1))
        setSelection([])
      }, 650)
    }
  }
}

function buildShuffledDeck() {
  const values = [1, 2, 3, 4, 5, 6]
  const pairValues = [...values, ...values]
  const shuffled = pairValues
    .map((v) => ({ v, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item, idx) => ({ id: idx, value: item.v, matched: false }))
  return shuffled
}
