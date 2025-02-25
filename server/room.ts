import { nanoid } from "nanoid"
import { clients, rooms } from "./server"
import { Room, SocketMessage } from "./types"

export function roomBroadcast(roomId: string, message: SocketMessage) {
  const players = clients.filter((c) => c.room === roomId)

  for (const player of players) player.socket.send(JSON.stringify(message))
}

export function changeTurn(roomId: string, turnId: string) {
  const room = rooms.find((r) => r.id === roomId)
  if (room == null) return

  room.turn = turnId
  roomBroadcast(roomId, {
    type: "turn_update",
    payload: turnId,
  })
}

export function createRoom() {
  const roomId = nanoid()
  rooms.push({
    id: roomId,
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    turn: "",
    chat: [],
  } satisfies Room)

  return roomId
}

export function sendBoardUpdate(roomId: string) {
  const room = rooms.find((r) => r.id === roomId)
  if (room == null) return

  roomBroadcast(roomId, {
    type: "board_update",
    payload: room.board,
  })
}
