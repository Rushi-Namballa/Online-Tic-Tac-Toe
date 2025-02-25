import { roomBroadcast } from "./room"
import { clients, rooms } from "./server"

export function handleChat(clientId: string, message: string) {
  if (message.length > 256) return

  const client = clients.find((c) => c.id === clientId)
  if (client == null) return

  const room = rooms.find((r) => r.id === client.room)
  if (room == null) return

  const chatMessage = {
    author: clientId,
    message,
  }
  room.chat.push(chatMessage)

  roomBroadcast(room.id, {
    type: "chat_message",
    payload: chatMessage,
  })
}
