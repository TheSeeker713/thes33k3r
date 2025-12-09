THE S33K3R TRANSMISSION
========================

"What happens on December 12th, 2025?"

A mysterious ARG (Alternate Reality Game) landing page featuring an interactive 
CRT television experience.

FEATURES
--------

CRT Television:
  - Power Knob - Turn the TV on/off
  - Channel Changer - Switch between channels (more videos coming soon!)
  - Volume Control - Adjust the audio
  - Brightness Control - Adjust screen brightness
  - Contrast Control - Adjust screen contrast
  - Static Effect - Experience authentic channel-changing static

Interactive Puzzle:
  - 8-tile sliding puzzle that reveals a secret date when solved
  - Neo-western themed design

Hidden Easter Eggs:
  - Look for the bunny...
  - There's a mysterious bubble somewhere...
  - Secrets await those who seek

TECH STACK
----------
  - React - UI Framework
  - Vite - Build Tool
  - Tailwind CSS v4 - Styling
  - Web Audio API - Sound Effects

GETTING STARTED
---------------

  # Install dependencies
  npm install

  # Run development server
  npm run dev

  # Build for production
  npm run build

ADDING NEW CHANNELS
-------------------

To add new video channels to the TV, update the channels array in 
src/components/CRTOverlay.jsx:

  const channels = [
    { id: 0, name: 'S33K', src: '/crtvideo' },
    { id: 1, name: 'CH02', src: '/newvideo' },  // Add your video here
    // ...
  ];

Place video files in the public/ folder in both .webm and .mp4 formats.

DEPLOYMENT
----------

Deployed on Cloudflare Pages at thes33k3r.com

CREDITS
-------
  - digiartifact
  - mycelia interactive
  - THE S33K3R

---

November 29th was just the beginning...

THE S33K3R is watching.
