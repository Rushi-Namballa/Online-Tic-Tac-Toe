"use client"
import {
  faArrowLeft,
  faCheck,
  faHourglass,
  faPaperPlane,
  faRotate,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import Navbar from "../Navbar"
import IconButton from "../components/IconButton"
import GridCell from "./GridCell"
import { getGameData, markers } from "../common"
import { ChatMessage } from "@/server/types"

interface OpponentInfo extends GameData {
  id: string
}

interface GameData {
  name: string
  marker: string
}

export default function GamePage() {
  const [isLoading, setIfLoading] = useState(true)
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null)
  const [opponentInfo, setOpponentInfo] = useState<OpponentInfo | null>(null)
  const [turn, setTurn] = useState(false)
  const [board, setBoard] = useState<string[][]>([])
  const [chat, setChat] = useState<ChatMessage[]>([])
  const [gameEnd, setGameEnd] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [opponentWins, setOpponentWins] = useState(0)
  const [myWins, setMyWins] = useState(0)
  const data = getGameData()
  const chatInputRef = useRef<HTMLInputElement | null>(null)

  const opponentInfoRef = useRef(opponentInfo)
  opponentInfoRef.current = opponentInfo

  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_SOCKET_URL!)
    ws.onmessage = handleMessage
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "auth",
          payload: data,
        })
      )
    }

    setWebSocket(ws)
  }, [])

  function handleMessage(e: MessageEvent) {
    const message = JSON.parse(e.data)
    if (message.type === "match_found") {
      setIfLoading(false)
      setOpponentInfo(message.payload)
    }

    if (message.type === "turn_update")
      setTurn(message.payload !== opponentInfoRef.current?.id)

    if (message.type === "board_update") {
      setBoard(message.payload)
      setWinner(null)
    }

    if (message.type === "chat_message") setChat((p) => [...p, message.payload])

    if (message.type === "game_end") setGameEnd(true)

    if (message.type === "win") {
      setWinner(message.payload)
      if (message.payload === opponentInfoRef.current?.id) setOpponentWins((p) => p + 1)
      else setMyWins((p) => p + 1)
    }
  }

  return (
    <main className="w-screen h-screen flex flex-col">
      {gameEnd && (
        <div className="fixed left-0 top-0 w-screen h-screen bg-black/50 z-10 flex flex-col items-center justify-center gap-4">
          <h1 className="text-white text-5xl font-semibold">
            Your Opponent Has Left
          </h1>
          <button
            onClick={() => location.reload()}
            className="rounded-full font-medium px-4 py-2 bg-orange-400"
          >
            Play new game
          </button>
        </div>
      )}
      <Navbar>
        <IconButton
          icon={faArrowLeft}
          className="hover:gap-2.5 transition-all"
          href="/"
        >
          {isLoading ? "Cancel" : "Leave Game"}
        </IconButton>
      </Navbar>

      <div className="flex-grow flex justify-center items-center gap-64">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faRotate} spin className="text-6xl" />
            <h1 className="text-2xl font-light mt-4">
              Waiting for opponent...
            </h1>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <div className="rounded overflow-hidden border border-neutral-700">
                <table className="w-96 [&_th]:bg-orange-400 [&_td]:p-3 [&_th]:p-3">
                  <tbody>
                    <tr className="border-b border-neutral-700">
                      <th className="border-r border-inherit">Players</th>
                      <td className="border-r border-inherit">
                        <div className="flex gap-2 items-center">
                          {data && (
                            <FontAwesomeIcon
                              icon={
                                markers.find((i) => i.iconName == data.marker)!
                              }
                            />
                          )}
                          {data && data.name}
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-2 items-center">
                          {opponentInfo && (
                            <FontAwesomeIcon
                              icon={
                                markers.find(
                                  (i) => i.iconName == opponentInfo.marker
                                )!
                              }
                            />
                          )}
                          {opponentInfo && opponentInfo.name}
                        </div>
                      </td>
                    </tr>

                    <tr className="border-neutral-700">
                      <th className="border-r border-inherit">Wins</th>
                      <td className="border-r border-inherit">{myWins}</td>
                      <td>{opponentWins}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-rows-3 grid-cols-3 w-96 h-96 border rounded-md overflow-hidden border-neutral-600">
                {new Array(9).fill(null).map((_, i) => {
                  const rowIndex = Math.floor(i / 3)
                  const colIndex = i % 3

                  return (
                    <GridCell
                      onClick={() => {
                        webSocket?.send(
                          JSON.stringify({
                            type: "turn",
                            payload: `${rowIndex}:${colIndex}`,
                          })
                        )
                      }}
                      marker={
                        board[rowIndex]?.[colIndex] &&
                        (board[rowIndex][colIndex] == opponentInfo?.id
                          ? opponentInfo?.marker
                          : data.marker)
                      }
                      key={i}
                      dark={i % 2 == 0}
                      disabled={!turn || winner != null}
                      className={
                        board[rowIndex]?.[colIndex] == opponentInfo?.id
                          ? "text-neutral-800"
                          : "text-white"
                      }
                    />
                  )
                })}
              </div>

              <p className="text-xl text-neutral-700 flex gap-2 self-center items-center">
                {winner == null ? (
                  <>
                    <FontAwesomeIcon icon={turn ? faCheck : faHourglass} />
                    It's your {!turn && "opponent's"} turn
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faTrophy} />
                    {winner == opponentInfo?.id
                      ? "Your opponent won!"
                      : "You won!"}
                  </>
                )}
              </p>

              {winner != null && (
                <p className="text-neutral-700 font-light text-center -mt-4">
                  A new game will begin shortly...
                </p>
              )}
            </div>

            <div className="flex flex-col h-[30rem] max-h-full w-72 border border-neutral-700 rounded overflow-hidden">
              <div className="bg-orange-500 border-b border-inherit flex items-center justify-center h-16">
                Chat
              </div>

              <div className="flex flex-col flex-grow gap-4 px-2 py-4">
                {chat.map((msg, i) => (
                  <span
                    key={i}
                    className={msg.author == opponentInfo?.id ? "" : "self-end"}
                  >
                    {msg.message}
                  </span>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()

                  const formData = new FormData(e.currentTarget)
                  webSocket?.send(
                    JSON.stringify({
                      type: "chat",
                      payload: formData.get("message"),
                    })
                  )

                  if (chatInputRef.current) chatInputRef.current.value = ""
                }}
                className="border-t border-inherit flex p-2 bg-orange-400"
              >
                <input
                  type="text"
                  name="message"
                  ref={chatInputRef}
                  placeholder="Type a message..."
                  autoComplete="off"
                  className="flex-grow bg-transparent placeholder:text-white placeholder:opacity-50 placeholder:italic outline-none"
                />

                <button>
                  <FontAwesomeIcon icon={faPaperPlane} className="opacity-75" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
