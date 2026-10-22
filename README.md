# Indian Bike Racing — Quick Match Auto Start

## Update
- Quick Match rooms automatically start the race 3 seconds after the 5th player joins.
- All players in that room receive the same server-sent race start event. Nobody needs to press Start Online individually.
- If a player leaves and the room drops below 5 before countdown completes, auto-start is cancelled and matchmaking waits for 5 again.
- Maximum room size remains 6 players.
- Manual Start Online is also enabled at 5 players.
- Existing reverse control, leaderboard, bike garage, weather and mobile UI are preserved.

## Run locally
```bash
npm.cmd install
npm.cmd start
```
Open http://localhost:3000.

## Deploy to Render
Upload the extracted project files (not the ZIP itself) to the GitHub repository, commit the changes, then use Render → Manual Deploy → Deploy latest commit.

## Notes
JavaScript syntax checks passed. Full five/six-client live multiplayer testing has not been performed.
