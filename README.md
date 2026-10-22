# Indian Bike Racing — Free Ride, Traffic, Showroom & Controls Update

## Run
1. Extract the ZIP.
2. Open PowerShell in this folder.
3. Run `npm.cmd install`
4. Run `npm.cmd start`
5. Open `http://localhost:3000`.

Do not open `index.html` directly; multiplayer and Socket.IO require the server.

## Added in this prototype
- Drag the game view in the lobby to rotate the bike showroom preview.
- Bike category filters (All, Street, Off-road, Sport).
- Traffic City Ride option on the City Night Race track with moving simple traffic vehicle models (cars/bus-like/truck-like/tractor-like variants).
- Free Ride mode with race finish disabled; join/create a room first to try roaming with online players.
- Championship mode entry button and five-race route description in the lobby.
- Gamepad input support via browser Gamepad API (gas/brake, steering, nitro, handbrake) and mobile camera/pause buttons.
- Existing weather selection, garage, coins, achievements, minimap, and multiplayer prototype retained.

## Prototype limitations
Traffic models are simple placeholder geometry, not detailed licensed vehicle models. Championship currently provides a mode entry and race sequence description; automatic progression across five different tracks is not fully implemented. Online free-roam uses the existing prototype's position relay, not authoritative physics or persistent online accounts. Gamepad mappings vary by controller/browser. Test locally and on the target browser before sharing publicly.


Bike collection update: added 15 bikes across Street, Sport, Dirt/Enduro/Motocross and Adventure categories. Suggested in-game coin prices are included. Bike entries use the game's existing procedural bike model builder; dedicated licensed 3D models are not included. Existing saved progress is preserved, but previously owned bike indices may map to different bikes after this expanded roster; consider resetting localStorage key `ibr1` if garage ownership looks unexpected.


## Mobile update (landscape + two-thumb controls)
- Game is landscape-only on phones. First tap enters fullscreen and locks landscape (Android Chrome). On iPhone/Safari, which cannot lock orientation, a "rotate your phone" screen shows in portrait and the race auto-pauses.
- Two-thumb layout: left thumb = Steer ◀ ▶, right thumb = big Gas ▲, Brake ■, N2O (nitro), HB (handbrake). Multi-touch works, so you can steer and gas together.
- Compact HUD: small minimap top-left, speed/nitro bottom-centre, Cam/Reset/Pause + Day/Night toggle top-right, respecting notches and safe areas.
- Lobby uses two columns in landscape (start/modes/online on the left, bikes/maps on the right). Start button stays visible.
- Lower render resolution on phones for smoother FPS; screen stays awake while playing.
- Added `manifest.webmanifest` + `icon.svg`: use "Add to Home screen" for true fullscreen landscape app mode.
- Phone testing: run on your PC, open `http://<PC-IP>:3000` on the phone (same Wi-Fi). Fullscreen/orientation lock work best on HTTPS or localhost.
