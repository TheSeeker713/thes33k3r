# Finishing the Bank reward card

### [December 22nd, 2025] [7:48 PM MT]

The Bank needed a reward that belonged to the story. Between December 22 and December 27, I worked on the S33k3r card that appears after the vault puzzle. Its front carries the artwork; turning it over reveals the entity record.

I added a three-dimensional flip and connected the card to the win state. The card gave the player something to inspect after completing the puzzle. It also made the end of the encounter more specific than a success message on an otherwise empty screen.

During this pass, I removed the abandoned brothel route. It was an older room experiment that no longer had a place in the experience I was shipping.

## The safe had to stay open

The reward background changed to the open-safe image. I then corrected how that background survived phase changes and adjusted its cover behavior. The puzzle state could be correct while the room still showed the wrong image; both needed to tell the same story.

I added image preloading to reduce the chance of the background appearing late.

## Sound needed a fallback, and files needed to ship

The card flip used a short sound effect. I added audio preloading, error reporting and a Web Audio fallback for cases where the usual audio element couldn't play. The fallback gave the sound another playback path, while the error reporting made a failed attempt easier to investigate.

The last issue was in the repository. The safe image and flip sound were referenced by the code but affected by ignore rules. I corrected the tracking so the files could reach the deployment.

That was the useful lesson from this set of changes: the game state, the presentation and the asset inventory have to agree. The card isn't finished just because it flips correctly in a local build.

---

## Sources

Work dates follow the linked commit record in Mountain Time. This account was revised on October 3, 2026.

### GitHub commits

- [9bb5db4 — Introduce the reward-card flip](https://github.com/TheSeeker713/thes33k3r/commit/9bb5db44c0b1b9c3e98edd8b555b430696aaf4c4)
- [038fcbe — Remove the abandoned brothel route](https://github.com/TheSeeker713/thes33k3r/commit/038fcbea92f4351e58c4a0cac33e42aed74ff2d2)
- [1410a03 — Integrate the card into the Bank win state](https://github.com/TheSeeker713/thes33k3r/commit/1410a035a92513b860bea18abe9111b6d7ef9d8f)
- [825a8db — Use the open-safe image for the reward background](https://github.com/TheSeeker713/thes33k3r/commit/825a8db9b036afcb2a4292c45ef9df5cdca67e3d)
- [1f93c54 — Correct the reward background after phase changes](https://github.com/TheSeeker713/thes33k3r/commit/1f93c541661750f4ca72337d6f06ad221b99ab3c)
- [2ce9170 — Preload media and add audio fallback diagnostics](https://github.com/TheSeeker713/thes33k3r/commit/2ce9170477f33fe2bf62f27fb3eac46ecc0ff5f0)
- [4dbbd0f — Revise the safe background and card-flip preload](https://github.com/TheSeeker713/thes33k3r/commit/4dbbd0f5206b9e21470aebb5c8af5781aea61628)
- [b803ab0 — Correct the historical date range](https://github.com/TheSeeker713/thes33k3r/commit/b803ab0f5337dce02d051849a97061507edaa0b4)
- [4bbed39 — Track required image and sound files](https://github.com/TheSeeker713/thes33k3r/commit/4bbed39f1180dfdac51ba2345627fee7c37086bb)

### Site source at this stage

- [Reward-card and audio source](https://github.com/TheSeeker713/thes33k3r/blob/4bbed39f1180dfdac51ba2345627fee7c37086bb/src/components/S33k3rCard.tsx)
- [Bank reward integration](https://github.com/TheSeeker713/thes33k3r/blob/4bbed39f1180dfdac51ba2345627fee7c37086bb/src/components/BankEncounter.tsx)
- [Asset tracking rules](https://github.com/TheSeeker713/thes33k3r/blob/4bbed39f1180dfdac51ba2345627fee7c37086bb/.gitignore)
