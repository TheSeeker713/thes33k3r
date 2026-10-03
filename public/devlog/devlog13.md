# Giving the collective its faces

### [October 3rd, 2026] [12:51 AM MT]

The collective section still used symbols after the redesign. I wanted the approved character images on the landing page, with character cards on /collective. The artwork had reached a point where visitors could start meeting the people behind the fragment names.

I integrated eight portraits: Soul, Shadow, Radio, Lost, Ethan, Emma, Silent and Unknown. Sun, Star and Song kept their symbols in this release because their existing approved portraits hadn't been supplied to this implementation. The roster still contains all eleven fragments.

## The images had to respect the story

These characters come from different realities. Their environments, clothes and ways of carrying themselves should make that visible. Putting them into one shared costume or one generic future would erase part of what makes the collective interesting.

The Walker relationship needed a clear correction. Ethan James Walker and Emma Grace Walker are teenage male and female versions of the same person from alternate realities. They aren't twins separated at birth. Each has a distinct life and memory within the collective consciousness known as The S33k3r.

Unknown also needed his own treatment. His identity stays hidden in a surveillance reality close to our world. The approved portrait uses a modern charcoal cloak and keeps the triangle pin. His face remains concealed.

## Making the portraits work on the website

I used one shared roster for the landing profiles and the collective cards. Each profile links to its matching card, so the names, order and destinations stay connected.

The site ships WebP derivatives at 256 pixels wide for the profile images and 768 pixels wide for the cards. The sixteen files total about 1.7 MB. Reserved image dimensions and lazy loading help the browser lay out the page without requesting every portrait immediately.

The cards use three columns on desktop, two on tablets and one on phones. The landing profiles wrap into smaller rows. Browser checks covered desktop, tablet and phone-width layouts, including 390 and 320 pixels, without horizontal overflow in those checks. Physical iOS and Android testing remains separate.

This release puts the eight approved faces where people can find them. The collective is still eleven fragments, and the remaining portraits can join the same structure when their approved assets are ready.

---

## Sources

Work dates follow the linked commit record in Mountain Time. This account was revised on October 3, 2026.

### GitHub commits

- [208d0d9 — Add fragment portraits and collective character cards](https://github.com/TheSeeker713/thes33k3r/commit/208d0d9de180ea6202fbb83b7072f36fb52157e1)

### Site source at this stage

- [Shared eleven-fragment roster and character descriptions](https://github.com/TheSeeker713/thes33k3r/blob/208d0d9de180ea6202fbb83b7072f36fb52157e1/src/lib/fragments.js)
- [Landing-page profile links](https://github.com/TheSeeker713/thes33k3r/blob/208d0d9de180ea6202fbb83b7072f36fb52157e1/src/app/page.jsx)
- [Collective portrait cards](https://github.com/TheSeeker713/thes33k3r/blob/208d0d9de180ea6202fbb83b7072f36fb52157e1/src/app/collective/page.jsx)
- [Responsive portrait and card layout](https://github.com/TheSeeker713/thes33k3r/blob/208d0d9de180ea6202fbb83b7072f36fb52157e1/src/app/globals.css)
- [Approved modern-cloaked Unknown portrait](https://github.com/TheSeeker713/thes33k3r/blob/208d0d9de180ea6202fbb83b7072f36fb52157e1/public/images/fragments/unknown.webp)
