import type { WebSocket } from "ws"

interface Client {
  id: string
  marker: string
  name: string
  socket: WebSocket
  room?: string
}

interface ChatMessage {
  author: string
  message: string
}

interface Room {
  id: string
  board: (string | null)[][]
  turn: string
  chat: ChatMessage[]
}

interface SocketMessage {
  type: string
  payload: any
}
