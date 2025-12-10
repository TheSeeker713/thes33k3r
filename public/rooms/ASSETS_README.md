# Cinematic Engine Assets Guide

## Directory Structure

All assets for the Cinematic Narrative Engine should be placed in `/public/rooms/`.

## Naming Convention

### Static Background Images
Format: `{room-id}-{descriptor}.jpg` or `.png`

Examples:
- `bank-lobby.jpg`
- `bank-vault-interior.jpg`
- `saloon-main.jpg`
- `sheriff-office.jpg`
- `hotel-lobby.jpg`

### Transition Videos
Format: `{source-room}-to-{target-room}.mp4` or `{room}-{action}.mp4`

Examples:
- `bank-to-vault.mp4` (POV walking into vault)
- `vault-to-bank.mp4` (POV walking back to lobby)
- `bank-to-saloon.mp4` (traveling between locations)
- `saloon-approach-bar.mp4` (in-room action)
- `sheriff-check-wanted.mp4` (in-room interaction)

## Critical Requirements for Seamless Transitions

**The magic of this system depends on frame-perfect alignment:**

1. **First Frame Rule:** The first frame of a transition video MUST match (or closely match) the static background image of the source room.
   
2. **Last Frame Rule:** The last frame of a transition video MUST match the static background image of the destination room.

3. **Example Workflow:**
   ```
   User clicks "Enter Vault" card in Bank Lobby
   → bank-lobby.jpg is visible
   → bank-to-vault.mp4 plays (Frame 1 looks like bank-lobby.jpg)
   → Video plays through (POV walking into vault)
   → Video ends (Last frame looks like bank-vault-interior.jpg)
   → Engine instantly swaps to bank-vault-interior.jpg
   → User sees NO visible "jump" or flicker
   ```

## Asset Checklist

### Currently Configured in `worldConfig`:

#### Bank Room
- [ ] `bank-lobby.jpg` - Main bank interior
- [ ] `bank-to-vault.mp4` - POV entering vault
- [ ] `vault-to-bank.mp4` - POV returning to lobby
- [ ] `bank-to-saloon.mp4` - Traveling to saloon
- [ ] `bank-talk-teller.mp4` - In-room interaction

#### Bank Vault
- [ ] `bank-vault-interior.jpg` - Inside vault
- [ ] `vault-inspect-safe.mp4` - In-room action

#### Saloon
- [ ] `saloon-main.jpg` - Saloon interior
- [ ] `saloon-to-bank.mp4` - Traveling to bank
- [ ] `saloon-to-sheriff.mp4` - Traveling to sheriff
- [ ] `saloon-approach-bar.mp4` - In-room interaction

#### Sheriff's Office
- [ ] `sheriff-office.jpg` - Sheriff's office interior
- [ ] `sheriff-to-saloon.mp4` - Traveling to saloon
- [ ] `sheriff-to-hotel.mp4` - Traveling to hotel
- [ ] `sheriff-check-wanted.mp4` - In-room action

#### Hotel
- [ ] `hotel-lobby.jpg` - Hotel lobby
- [ ] `hotel-to-sheriff.mp4` - Traveling to sheriff
- [ ] `hotel-to-bank.mp4` - Traveling to bank
- [ ] `hotel-rent-room.mp4` - In-room interaction

## Existing Assets (to be renamed/organized)

Current files in `/public/rooms/`:
- `Bank_room.png` → Rename to `bank-lobby.jpg`
- `saloon_room.png` → Rename to `saloon-main.jpg`
- `generalstore_room.png` → Could be used for `sheriff-office.jpg` or another location
- `brothel_room.png` → For the `/brothel` page (separate from main engine)
- `download (1-3).mp4` → Rename to appropriate transition videos
- Various screenshots → Evaluate for use as room backgrounds

## Video Creation Tips

1. **Resolution:** Match your background images (recommend 1920x1080 or higher)
2. **Format:** MP4 with H.264 codec for web compatibility
3. **Duration:** Keep transitions short (2-5 seconds for in-room actions, 5-10 seconds for travel)
4. **Frame Rate:** 24-30 fps is sufficient
5. **Compression:** Balance quality and file size (aim for under 5MB per video)
6. **Audio:** Optional - can add ambient sound or keep silent
7. **Preload:** Videos use `preload="auto"` so they start instantly on click

## Testing Your Assets

After placing assets in `/public/rooms/`:
1. Update paths in `src/types/game.ts` to match your actual filenames
2. Start dev server: `npm run dev`
3. Click through each card and verify:
   - No visible "jump" between video end and static image
   - Videos load quickly (preload working)
   - Cards appear/disappear smoothly
   - No flicker or black frames

## Fallback Behavior

If a video fails to load:
- Engine will skip directly to the target room (hard cut)
- Check browser console for errors
- Verify file paths are correct in `worldConfig`
