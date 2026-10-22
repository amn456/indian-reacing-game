# Indian Bike Racing — Leaderboard, Reverse & 6-Player Start

## Features added
- Online room capacity is now 6 players.
- `Start Online Race` button: race starts only after all 6 players have joined and someone presses the button. Before 6 players, the server sends a waiting message.
- Online leaderboard shows race finishes and best recorded time for the current server process. This is in-memory and resets if the server restarts; it is not a persistent account-based global ranking yet.
- Reverse gear: hold `X` on keyboard or hold the `R` touch control. Gas moves the bike forward again. Reverse gear is shown as `R` on the HUD.
- Existing bike garage, map, weather and other game UI are preserved.

## Run locally
```bash
npm.cmd install
npm.cmd start
```
Open http://localhost:3000 .

## Deploy update
Upload the extracted project files (not the ZIP itself) to the existing GitHub repository, commit, then trigger a Render deploy. Make sure `index.html`, `server.js`, `package.json`, and `package-lock.json` are kept together.

## Limitations
- The 6-player start requires exactly 6 connected players in the same room; with fewer than 6 it waits.
- Online leaderboard is in-memory and based on client-reported finish events; it is a prototype, not cheat-resistant or persistent.
- JavaScript syntax checks passed, but full browser and six-client multiplayer testing was not performed.
