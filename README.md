# Indian Bike Racing — Online & Mobile Update

## Included in this prototype
- Offline Open World button: launches solo free-roam on the currently loaded map. This is not yet a seamless, large streaming open world.
- Random Match: joins an available room for the selected map or creates one; rooms are capped at 6 players.
- Global chat: messages are broadcast to all connected clients, with basic text sanitization and per-socket rate limiting. Do not treat this prototype chat as a fully moderated production chat.
- Engine sound tuning: smoother synthesized RPM pitch and audio envelope. It is still synthesized audio, not recorded motorcycle audio.
- Existing garage, maps, weather, traffic/free-ride modes, and mobile controls retained.

## Run locally
1. Install Node.js LTS.
2. Extract this ZIP.
3. Open a terminal in the extracted folder.
4. Run `npm install`
5. Run `npm start`
6. Open `http://localhost:3000`

## Deploy update
Upload/commit the files in this ZIP to your GitHub repository, then trigger a redeploy on Render. Ensure the service start command is `npm start`. Render must support persistent WebSocket connections for Socket.IO.

## Notes
This is an evolving browser game prototype. Random matchmaking and global chat require the Node server to be running. Offline free roam works locally on the map assets that are already loaded, but the game does not yet have a fully seamless world-streaming system. The code has been syntax-checked; full gameplay, multiplayer, chat moderation, and phone testing still need to be performed.
