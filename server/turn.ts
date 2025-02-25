import { changeTurn, roomBroadcast, sendBoardUpdate } from "./room"
import { clients, rooms } from "./server"

export function handleTurn(clientId: string, turn: string) {
  const client = clients.find((c) => c.id === clientId)
  if (client == null) return

  const room = rooms.find((r) => r.id == client.room)
  if (room == null) return

  if (room.turn !== clientId) return

  const [row, col] = turn.split(":").map((i) => parseInt(i))
  if (room.board[row][col] !== null) return
  room.board[row][col] = clientId

  const opponent = clients.find((c) => c.id !== clientId && c.room == room.id)
  if (opponent == null) return

  changeTurn(room.id, opponent.id)
  sendBoardUpdate(room.id)

  const winner = checkWinner(room.board)
  if (winner) {
    roomBroadcast(room.id, {
      type: "win",
      payload: winner,
    })

    room.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]

    setTimeout(() => sendBoardUpdate(room.id), 5000)
  }
}

export function checkWinner(board: (string | null)[][]): string | null {
  const size = board.length

  // Check rows
  for (let i = 0; i < size; i++) {
    const row = board[i]
    if (row[0] && row.every((cell) => cell === row[0])) {
      return row[0]
    }
  }

  // Check columns
  for (let i = 0; i < size; i++) {
    const firstCell = board[0][i]
    if (firstCell && board.every((row) => row[i] === firstCell)) {
      return firstCell
    }
  }

  // Check diagonal (top-left to bottom-right)
  const firstDiagonalCell = board[0][0]
  if (
    firstDiagonalCell &&
    board.every((row, index) => row[index] === firstDiagonalCell)
  ) {
    return firstDiagonalCell
  }

  // Check diagonal (top-right to bottom-left)
  const secondDiagonalCell = board[0][size - 1]
  if (
    secondDiagonalCell &&
    board.every((row, index) => row[size - 1 - index] === secondDiagonalCell)
  ) {
    return secondDiagonalCell
  }

  // No winner found
  return null
}
