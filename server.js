const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const app = express(), server = http.createServer(app), io = new Server(server);
const PORT = process.env.PORT || 3000, rooms = new Map(), MAX = 6, leaderboard = new Map();
app.use(express.static(__dirname));
app.get('/',(_req,res)=>res.sendFile(path.join(__dirname,'index.html')));
function makeCode(){const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let c;do{c=Array.from({length:5},()=>chars[Math.random()*chars.length|0]).join('')}while(rooms.has(c));return c}
function players(r){return [...r.players.values()]}
function broadcast(r){io.to(r.code).emit('room-update',{room:r.code,players:players(r)})}
io.on('connection',s=>{
 s.on('join-room',(d={})=>{
  const mode=['quick','create','join'].includes(d.mode)?d.mode:'quick';let code;
  if(mode==='create')code=makeCode();
  else if(mode==='join')code=String(d.code||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,5);
  else {const found=[...rooms.values()].find(r=>!r.started&&r.players.size<MAX&&r.map===Number(d.map||0));code=found?found.code:makeCode()}
  if(!code)return s.emit('room-error','Enter a room code.');
  let r=rooms.get(code);
  if(!r&&mode==='join')return s.emit('room-error','Room not found. Check the code.');
  if(!r){r={code,map:Number(d.map)||0,players:new Map(),started:false};rooms.set(code,r)}
  if(r.started)return s.emit('room-error','Race already started.');
  if(r.players.size>=MAX)return s.emit('room-error','Room full (maximum 6 players).');
  if(s.data.room){const old=rooms.get(s.data.room);if(old){old.players.delete(s.id);broadcast(old);if(!old.players.size)rooms.delete(old.code)}}
  s.join(code);s.data.room=code;
  r.players.set(s.id,{id:s.id,name:String(d.name||'Racer').replace(/[<>]/g,'').slice(0,18),bike:Math.max(0,Math.min(3,+d.bike||0)),x:0,z:0,h:0,v:0});
  s.emit('room-joined',{room:code,players:players(r)});broadcast(r);
 });
 s.on('player-state',d=>{const r=rooms.get(s.data.room),p=r?.players.get(s.id);if(!r||!p||!r.started||d.room!==r.code)return;
  if(!['x','z','h','v'].every(k=>Number.isFinite(Number(d[k]))))return;
  if(Math.abs(+d.x)>3000||Math.abs(+d.z)>3000)return;
  Object.assign(p,{x:+d.x,z:+d.z,h:+d.h,v:Math.max(0,Math.min(100,+d.v)),name:String(d.name||p.name).replace(/[<>]/g,'').slice(0,18),bike:Math.max(0,Math.min(3,+d.bike||0))});
  s.to(r.code).emit('player-state',p);
 });
 s.on('start-race',d=>{const r=rooms.get(s.data.room);if(!r||d.room!==r.code||r.started)return;if(r.players.size<6){s.emit('race-wait',{count:r.players.size,required:6});broadcast(r);return}r.started=true;io.to(r.code).emit('race-start',{room:r.code,startedAt:Date.now()+4000})});
 s.on('race-finished',d=>{const r=rooms.get(s.data.room);if(!r||d.room!==r.code)return;const p=r.players.get(s.id);if(!p)return;const name=String(d.name||p.name).replace(/[<>]/g,'').slice(0,18)||'Racer';const row=leaderboard.get(s.id)||{id:s.id,name,finishes:0,bestTime:null};row.name=name;row.finishes++;const t=Number(d.time);if(Number.isFinite(t)&&t>0&&(!row.bestTime||t<row.bestTime))row.bestTime=t;leaderboard.set(s.id,row)});
 s.on('get-leaderboard',()=>{const rows=[...leaderboard.values()].sort((a,b)=>b.finishes-a.finishes||(a.bestTime||Infinity)-(b.bestTime||Infinity)).slice(0,10).map(({name,finishes,bestTime})=>({name,finishes,bestTime}));s.emit('leaderboard-data',rows)});
 s.on('disconnect',()=>{const r=rooms.get(s.data.room);if(!r)return;r.players.delete(s.id);s.to(r.code).emit('player-left',s.id);broadcast(r);if(!r.players.size)rooms.delete(r.code)});
});
server.listen(PORT,()=>console.log('Indian Bike Racing multiplayer server: http://localhost:'+PORT));
