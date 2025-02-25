import type WebSocket from "ws"
import { Client, SocketMessage } from "./types"
import { clients } from "./server"
import { changeTurn, createRoom } from "./room"
import { nanoid } from "nanoid"

export function handleAuth(
  data: SocketMessage,
  clientId: string,
  socket: WebSocket
) {
  clients.push({
    id: clientId,
    marker: data.payload.marker,
    name: data.payload.name,
    socket,
  } satisfies Client)
  handleNewClient(clientId)
}
export function handleNewClient(clientId: string) {
  const client = clients.find((c) => c.id === clientId)
  if (client == null)
    return console.error(
      `handleNewClient called with invalid clientId: ${clientId}`
    )

  const freeClients = clients.filter((c) => c.room == null && c.id !== clientId)
  const opponent = freeClients[Math.floor(Math.random() * freeClients.length)]
  if (opponent == null) return

  const roomId = createRoom()
  opponent.room = roomId
  client.room = roomId

  opponent.socket.send(
    JSON.stringify({
      type: "match_found",
      payload: {
        id: client.id,
        name: client.name,
        marker: client.marker,
      },
    })
  )

  client?.socket.send(
    JSON.stringify({
      type: "match_found",
      payload: {
        id: opponent.id,
        name: opponent.name,
        marker: opponent.marker,
      },
    })
  )

  changeTurn(roomId, Math.random() > 0.5 ? client.id : opponent.id)
}
