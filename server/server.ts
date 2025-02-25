import { nanoid } from "nanoid";
import type { WebSocket, RawData } from "ws";
import { WebSocketServer } from "ws";
import { Client, Room, SocketMessage } from "./types";
import { handleAuth } from "./auth";
import { handleTurn } from "./turn";
import { roomBroadcast } from "./room";
import { handleChat } from "./chat";
import chalk from "chalk";
import ora from "ora";

const wss = new WebSocketServer({ port: 3001 });

export let clients: Client[] = [];
export let rooms: Room[] = [];

wss.on("connection", (ws: WebSocket) => {
  const clientId = nanoid();
  ws.on("error", console.error);

  ws.on("message", (data: RawData) => {
    handleMessage(data, clientId, ws);
  });

  ws.on("close", () => {
    const client = clients.find((c) => c.id === clientId);
    if (!client) return;
    clients = clients.filter((c) => c !== client);

    if (client.room == null) return;
    const room = rooms.find((r) => r.id == client.room);
    if (!room) return;

    roomBroadcast(room.id, {
      type: "game_end",
      payload: null,
    });
    rooms = rooms.filter((r) => r.id !== room.id);
  });

  setTimeout(() => {
    if (!clients.find((c) => c.id === clientId)) ws.close();
  }, 500);
});

function handleMessage(data: any, clientId: string, socket: WebSocket) {
  try {
    const message: SocketMessage = JSON.parse(data.toString());
    if (!message.payload || !message.type) return;

    if (
      message.type === "auth" &&
      message.payload.marker &&
      message.payload.name
    )
      handleAuth(message, clientId, socket);

    if (message.type == "turn") handleTurn(clientId, message.payload);
    if (message.type == "chat") handleChat(clientId, message.payload);
  } catch (e) {
    console.error(e);
  }
}

console.log(
  chalk.hex("#fca903").bgBlack(`
       _______ _____ _____   _______       _____   _______ ____  ______ 
      |__   __|_   _/ ____| |__   __|/\\   / ____| |__   __/ __ \\|  ____|
         | |    | || |         | |  /  \\ | |         | | | |  | | |__   
         | |    | || |         | | / /\\ \\| |         | | | |  | |  __|  
         | |   _| || |____     | |/ ____ \\ |____     | | | |__| | |____ 
         |_|  |_____\\_____|    |_/_/    \\_\\_____|    |_|  \\____/|______|
`)
);

ora("Server is running").start();
