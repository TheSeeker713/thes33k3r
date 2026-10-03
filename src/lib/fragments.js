// Shared ordering keeps the homepage portraits and collective cards in sync.
export const fragments = [
  { id: 'sun', name: 'Sun', label: 'Sun', symbol: '◯', role: 'THE SUN SEEKER', description: 'Grounded in physical humanity: desert, horses, roads and a neo-western world.' },
  { id: 'star', name: 'Star', label: 'Star', symbol: '✳', role: 'THE STAR SEEKER', description: 'An orbital and cosmic perspective. Data and patterns; complementary to Sun.' },
  { id: 'soul', name: 'Soul', label: 'Soul', role: 'CONSCIENCE & CONNECTION', description: 'Community, conscience, empathy and collective humanity.', alt: 'Soul Seeker in ochre and indigo woven layers, surrounded by community gardens' },
  { id: 'shadow', name: 'Shadow', label: 'Shadow', role: 'INVESTIGATION & HIDDEN TRUTH', description: 'An investigator who uncovers the Null Order / Null Dominion.', alt: 'Shadow Seeker in an oxblood detective coat in a rain-soaked city' },
  { id: 'radio', name: 'Radio', label: 'Radio', role: 'SIGNALS ACROSS REALITIES', description: 'Signals, transmissions and communication across realities.', alt: 'Radio Seeker wearing headphones beside analog transmission equipment' },
  { id: 'lost', name: 'Lost', label: 'Lost', role: 'DISPLACEMENT & MEMORY', description: 'A displaced survivor who remembers erased realities.', alt: 'Lost Seeker carrying a map among the ruins of a flooded world' },
  { id: 'ethan', name: 'Ethan James Walker', label: 'Ethan', role: 'TWIN SEEKER A', description: 'A teenage guide driven by practical curiosity. The male alternate-reality version of Emma, with a distinct life and memories within S33k3r.', alt: 'Ethan James Walker, a teenage boy in a brown work jacket beside a machine-age tramway' },
  { id: 'emma', name: 'Emma Grace Walker', label: 'Emma', role: 'TWIN SEEKER B', description: 'A teenage guide who questions and compares. The female alternate-reality version of Ethan, with a distinct life and memories within S33k3r.', alt: 'Emma Grace Walker, a teenage girl with a cream receiver and salmon jacket in a coastal retrofuture city' },
  { id: 'song', name: 'Song', label: 'Song', symbol: '◯', role: 'MUSIC & EXPRESSION', description: 'Music, expression and artistic memory.' },
  { id: 'silent', name: 'Silent', label: 'Silent', role: 'COMMUNICATION BEYOND VOICE', description: 'Without a speaking or singing voice. Communicates through gesture, light and visual patterns.', alt: 'Silent Seeker in pearl and indigo layers, expressing a gesture in a glass city' },
  { id: 'unknown', name: 'Unknown / Unnamed', label: 'Unknown', role: 'IDENTITY CONCEALED', description: 'A hidden identity from a present-day surveillance reality. A distinct fragment from Lost; his modern cloak keeps his face concealed.', alt: 'Unknown Seeker with his face concealed beneath a modern charcoal hooded cloak and a bronze triangle pin' },
]

export function portraitPath(fragment, profile = false) {
  return fragment.alt ? `/images/fragments/${fragment.id}${profile ? '-profile' : ''}.webp` : null
}
