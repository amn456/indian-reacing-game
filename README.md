# Indian Bike Racing — Room Host Map + Random Quick Match

## Updates
- Removed the Night Mode toggle and removed Night from the weather choices. Daytime remains the default; Sunny, Sunset, Rain, Fog and Storm remain.
- Create Room assigns the creator as room host.
- Host gets a Room Map selector and Apply Map button. Changing the map reloads clients onto that track and rejoins the same room.
- Quick Match chooses a random map for a newly created room and joins any waiting Quick Match room regardless of its map. Joining players synchronize to the room's selected map.
- Empty rooms are kept for up to 45 seconds to let clients reconnect after the shared map reload.

## Run locally
```bash
npm.cmd install
npm.cmd start
```
Open http://localhost:3000

## Deploy
Upload the files in this ZIP to the existing GitHub repository and commit them. Then redeploy the latest commit on Render. This is a prototype; test map switching and quick matchmaking with multiple browser sessions before sharing publicly.
