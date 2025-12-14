# Cinematic Engine Assets Guide

## Directory Structure

All assets for the Cinematic Narrative Engine should be placed in `/public/rooms/`.

## Naming Convention

### Static Background Images
Format: `{room-id}-{descriptor}.webp`

Examples:
- `bank-lobby.webp`
- `bank-vault-interior.webp`
- `saloon-main.webp`
- `sheriff-office.webp`
- `hotel-lobby.webp`

### Transition Videos
Format: `{source-room}-to-{target-room}.webm` or `{room}-{action}.webm`

⚠️ **File Size Requirement:** Each video file MUST be 25MB or under.

Examples:
- `bank-to-vault.webm` (POV walking into vault)
- `vault-to-bank.webm` (POV walking back to lobby)
- `bank-to-saloon.webm` (traveling between locations)
- `saloon-approach-bar.webm` (in-room action)
- `sheriff-check-wanted.webm` (in-room interaction)

## Critical Requirements for Seamless Transitions

**The magic of this system depends on frame-perfect alignment:**

1. **First Frame Rule:** The first frame of a transition video MUST match (or closely match) the static background image of the source room.
   
2. **Last Frame Rule:** The last frame of a transition video MUST match the static background image of the destination room.

3. **Example Workflow:**
   ```
   User clicks "Enter Vault" card in Bank Lobby
   → bank-lobby.webp is visible
   → bank-to-vault.webm plays (Frame 1 looks like bank-lobby.webp)
   → Video plays through (POV walking into vault)
   → Video ends (Last frame looks like bank-vault-interior.webp)
   → Engine instantly swaps to bank-vault-interior.webp
   → User sees NO visible "jump" or flicker
   ```

## Asset Checklist

### Currently Configured in `worldConfig`:

#### Bank Room
- [ ] `bank-lobby.webp` - Main bank interior
- [ ] `bank-to-vault.webm` - POV entering vault (≤25MB)
- [ ] `vault-to-bank.webm` - POV returning to lobby (≤25MB)
- [ ] `bank-to-saloon.webm` - Traveling to saloon (≤25MB)
- [ ] `bank-talk-teller.webm` - In-room interaction (≤25MB)

#### Bank Vault
- [ ] `bank-vault-interior.webp` - Inside vault
- [ ] `vault-inspect-safe.webm` - In-room action (≤25MB)

#### Saloon
- [ ] `saloon-main.webp` - Saloon interior
- [ ] `saloon-to-bank.webm` - Traveling to bank (≤25MB)
- [ ] `saloon-to-sheriff.webm` - Traveling to sheriff (≤25MB)
- [ ] `saloon-approach-bar.webm` - In-room interaction (≤25MB)

#### Sheriff's Office
- [ ] `sheriff-office.webp` - Sheriff's office interior
- [ ] `sheriff-to-saloon.webm` - Traveling to saloon (≤25MB)
- [ ] `sheriff-to-hotel.webm` - Traveling to hotel (≤25MB)
- [ ] `sheriff-check-wanted.webm` - In-room action (≤25MB)

#### Hotel
- [ ] `hotel-lobby.webp` - Hotel lobby
- [ ] `hotel-to-sheriff.webm` - Traveling to sheriff (≤25MB)
- [ ] `hotel-to-bank.webm` - Traveling to bank (≤25MB)
- [ ] `hotel-rent-room.webm` - In-room interaction (≤25MB)

## Existing Assets (to be renamed/organized)

Current files in `/public/rooms/`:
- `Bank_room.png` → Convert to `bank-lobby.webp`
- `saloon_room.png` → Convert to `saloon-main.webp`
- `generalstore_room.png` → Convert for `sheriff-office.webp` or another location
- `brothel_room.png` → Convert for `/brothel` page (separate from main engine)
- `download (1-3).mp4` → Convert to WebM transition videos (ensure ≤25MB each)
- Various screenshots → Evaluate and convert to WebP format

## Video Creation Tips

1. **Resolution:** Match your background images (recommend 1920x1080 or higher)
2. **Format:** WebM with VP8/VP9 codec for modern browser compatibility
3. **Duration:** Keep transitions short (2-5 seconds for in-room actions, 5-10 seconds for travel)
4. **Frame Rate:** 24-30 fps is sufficient
5. **File Size:** ⚠️ **CRITICAL - Each video MUST be 25MB or under.** Use VP9 codec with appropriate bitrate (typically 2-4 Mbps) to meet this constraint.
6. **Audio:** Optional - can add ambient sound or keep silent
7. **Preload:** Videos use `preload="auto"` so they start instantly on click

### Recommended Encoding Settings for WebM

**FFmpeg command example (VP9 codec):**
```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 3000k -c:a libopus -b:a 128k output.webm
```

Adjust `-b:v` (video bitrate) to keep final file size ≤25MB:
- For 10-second video: ~3 Mbps keeps file under 4MB
- For 15-second video: ~2 Mbps keeps file under 4MB
- For 30-second video: ~1.5 Mbps keeps file around 6MB

## File Size Verification

Before adding videos to the repository:
```bash
# Check file sizes
ls -lh /public/rooms/*.webm

# All .webm files must show ≤25MB
```

If a video exceeds 25MB:
1. Re-encode with lower bitrate
2. Reduce video duration
3. Lower resolution if necessary
4. Test file size before deploying

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
- Confirm video file exists and is ≤25MB
