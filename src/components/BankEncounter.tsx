'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import S33k3rCard from './S33k3rCard'
import BankVideo from './BankVideo'

type Phase = 'lobby' | 'transition' | 'game' | 'unlocked' | 'reward-video'

const LOBBY_BG = '/rooms/banklobby_room.webp'
const GAME_BG = '/rooms/bankvault_room.webp'
const TRANSITION_VIDEO = '/rooms/banklobby_to_bankvault.webm'
const REWARD_VIDEO = '/rooms/safe_open.webm'
const UNLOCKED_BG = '/rooms/safe_open.webp'
const BG_MUSIC = '/rooms/game_assets/music/Echoes in the Static.mp3' 
const SOUND_FX = {
  match: '/rooms/game_assets/sound_fx/match.webm',
  lifeLost: '/rooms/game_assets/sound_fx/life_lost.webm',
  gameWon: '/rooms/game_assets/sound_fx/game_won.webm',
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
  const deck = useMemo(() => buildShuffledDeck(), [])
  const [cards, setCards] = useState(deck)
  const [selection, setSelection] = useState<number[]>([])
  const [lives, setLives] = useState(6)
  const gameOver = lives === 0

  useEffect(() => {
    const allMatched = cards.every((c) => c.matched)
    if (allMatched && phase === 'game' && lives > 0) {
      playSound(SOUND_FX.gameWon)
      setPhase('reward-video')
    }
  }, [cards, phase, lives])

  // Diagnostic: preload unlocked background when transitioning to 'unlocked' so we can see if it fails to load on the live site
  useEffect(() => {
    if (phase === 'unlocked') {
      try {
        const img = new Image()
        img.src = UNLOCKED_BG
        img.onload = () => {
          console.log('[BankEncounter] UNLOCKED_BG loaded:', UNLOCKED_BG)
        }
        img.onerror = (e) => {
          console.error('[BankEncounter] UNLOCKED_BG failed to load:', UNLOCKED_BG, e)
        }
      } catch (err) {
        console.error('[BankEncounter] Error preloading UNLOCKED_BG', err)
      }
    }
  }, [phase])

  useEffect(() => {
    if (gameOver && phase === 'game') playSound(SOUND_FX.gameOver)
  }, [gameOver, phase])

  // Resolving a pair is cancelled on reset, navigation, or a phase change.
  useEffect(() => {
    if (phase !== 'game' || gameOver || selection.length !== 2) return
    const [firstId, secondId] = selection
    const first = cards.find(card => card.id === firstId)
    const second = cards.find(card => card.id === secondId)
    if (!first || !second) return
    const matched = first.value === second.value
    playSound(matched ? SOUND_FX.match : SOUND_FX.lifeLost)
    const timer = setTimeout(() => {
      if (matched) {
        setCards(previous => previous.map(card =>
          card.id === firstId || card.id === secondId ? { ...card, matched: true } : card,
        ))
      } else {
        setLives(previous => Math.max(0, previous - 1))
      }
      setSelection([])
    }, matched ? 250 : 650)
    return () => clearTimeout(timer)
  }, [cards, selection, phase, gameOver])

  function selectCard(id: number) {
    if (phase !== 'game' || gameOver || cards.find(card => card.id === id)?.matched) return
    setSelection(previous => previous.length === 2 || previous.includes(id) ? previous : [...previous, id])
  }

  function resetGame() {
    const newDeck = buildShuffledDeck()
    setCards(newDeck)
    setSelection([])
    setLives(6)
    setPhase('lobby')
  }

  function handlePlayAgain() {
    resetGame()
  }

  useEffect(() => {
    if (phase !== 'game' || gameOver) return
    const music = new Audio(BG_MUSIC)
    music.loop = true
    music.volume = 0.2
    music.play().catch(() => {})
    return () => {
      music.pause()
      music.currentTime = 0
    }
  }, [phase, gameOver])

  return (
    <div className="relative w-full h-dvh overflow-hidden font-mono text-amber-500">
      {/* Background for LOBBY and GAME */}
      <AnimatePresence>
        {(phase === 'lobby' || phase === 'game' || phase === 'unlocked') && (
          <motion.div
            // use phase in key so the background DOM node remounts on phase change
            key={`bg-${phase}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            style={{
              // compute current background explicitly for clarity
              backgroundImage: `url(${phase === 'game' ? GAME_BG : phase === 'unlocked' ? UNLOCKED_BG : LOBBY_BG})`,
              // use cover so the unlocked image fills the screen as expected
              backgroundSize: 'cover',
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

      {phase === 'transition' && (
        <BankVideo
          src={TRANSITION_VIDEO}
          label="Bank entrance cinematic"
          continueLabel="Continue to the game"
          onComplete={() => setPhase('game')}
        />
      )}

      {/* GAME: Numbers matching */}
      {phase === 'game' && !gameOver && (
        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4 gap-4">
          <div className="w-full max-w-4xl rounded-2xl p-6 bg-zinc-900/90 border border-amber-700/40 shadow-2xl">
            <h2 className="text-center text-xl mb-4">vault access protocol</h2>
            <p className="text-center text-amber-300/90 mb-6">reveal pairs of matching numbers to unseal the vault</p>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {cards.map((card) => (
                <NumberCard
                  key={card.id}
                  card={card}
                  revealed={card.matched || selection.includes(card.id)}
                  onClick={() => selectCard(card.id)}
                />
              ))}
            </div>
          </div>
          <div className="flex-shrink-0">
            <img 
              src={`/rooms/game_assets/images/lives/bulletchamber_${lives}.webp`}
              alt={`${lives} lives remaining`}
              className="h-14 md:h-32 w-auto"
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

      {phase === 'reward-video' && (
        <BankVideo
          src={REWARD_VIDEO}
          label="Vault opening cinematic"
          continueLabel="Continue to your reward"
          onComplete={() => setPhase('unlocked')}
        />
      )}

      {/* UNLOCKED */}
      {phase === 'unlocked' && (
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-2xl w-full rounded-2xl p-8 bg-black/70 backdrop-blur-md border border-amber-600/50 text-left"
          >
            <div className="text-3xl mb-2 text-amber-400 font-bold text-center">access granted</div>
            <p className="text-amber-300/80 mb-6 text-sm text-center">vault seal disengaged</p>

            <div className="flex justify-center">
              <S33k3rCard />
            </div>

            <div className="flex gap-3 justify-end">
              <Link
                href="/"
                className="px-4 py-2 rounded border border-amber-500/60 text-amber-300 hover:bg-amber-500/10 transition-colors font-mono text-sm"
              >
                return home
              </Link>
              <button
                onClick={handlePlayAgain}
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

function buildShuffledDeck() {
  const values = [1, 2, 3, 4, 5, 6]
  const pairValues = [...values, ...values]
  const shuffled = pairValues
    .map((v) => ({ v, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item, idx) => ({ id: idx, value: item.v, matched: false }))
  return shuffled
}
