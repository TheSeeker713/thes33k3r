# Video Directory

This directory contains the video files for the Movie Screen feature that activates on **December 12, 2025 at 10:00 AM PST**.

## Expected Files

Place your transmission video files here with the following naming convention:

- `transmission.mp4` - Primary video file (H.264 codec recommended)
- `transmission.webm` - Fallback video file (VP9 codec recommended)

## Video Specifications

**Recommended Format:**
- **Aspect Ratio:** 16:9 (Widescreen)
- **Resolution:** 1920x1080 or higher
- **Codec (MP4):** H.264
- **Codec (WebM):** VP9
- **Audio:** AAC or Opus, stereo
- **Bitrate:** 5-10 Mbps for high quality
- **Frame Rate:** 24-30 fps

**File Size:**
- Keep files under 100MB for reasonable loading times
- Consider compression if files are too large

## How It Works

The `MovieScreen.jsx` component automatically references these files:
- `/video/transmission.mp4` (primary source)
- `/video/transmission.webm` (fallback source)

When the target date/time is reached:
1. The CRT TV (4:3) transforms into a Movie Screen (16:9) with a 3-second glitch effect
2. Users can click the 🍿 popcorn button to play the video
3. The video plays with sound enabled

## Currently

**Status:** ⏳ Waiting for video upload

The Movie Screen is ready and will display a placeholder until the video files are added to this directory.

---

*Created: December 10, 2025*
