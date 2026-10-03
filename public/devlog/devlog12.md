# Letting more of the video loop show

### [October 2nd, 2026] [11:10 PM MT]

After reviewing the redesigned landing page, I wanted the looping video to be slightly more visible. The layout was working. The background just needed to contribute more to the transmission section.

I raised the video opacity from 6.5% to 12% in light mode, and from 14% to 20% in dark mode. That let more of the footage come through the light theme and gave the dark version a smaller lift.

The original loop stayed in place. I didn't want to replace its footage to solve a visibility problem. The text and the theater controls still needed to read clearly over it, so this was a small adjustment within the existing design.

## Keeping control with the visitor

The background kept its pause control and reduced-motion handling. Motion adds atmosphere, but someone reading the page needs a way to stop it, and the site needs to respect a preference for less animation.

This was a narrow follow-up to the rebuild. It didn't require a new layout or another player. A background can be too subtle even when the larger design is right; in this case, changing two theme values was enough to bring it forward for the next review.

---

## Sources

Work dates follow the linked commit record in Mountain Time. This account was revised on October 3, 2026.

### GitHub commits

- [96b9a53 — Increase background-loop visibility in both themes](https://github.com/TheSeeker713/thes33k3r/commit/96b9a53cadad34b381939d737421a6c3678a958a)

### Site source at this stage

- [Updated video opacity values](https://github.com/TheSeeker713/thes33k3r/blob/96b9a53cadad34b381939d737421a6c3678a958a/src/app/globals.css)
- [Loop controls and reduced-motion behavior](https://github.com/TheSeeker713/thes33k3r/blob/96b9a53cadad34b381939d737421a6c3678a958a/src/components/VideoBackground.jsx)
