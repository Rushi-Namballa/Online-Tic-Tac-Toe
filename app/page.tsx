import Navbar from "./Navbar"
import IconButton from "./components/IconButton"
import { faBook, faGear } from "@fortawesome/free-solid-svg-icons"

export default function Home() {
  return (
    <main className="flex flex-col w-screen h-screen items-center">
      <Navbar>
        <IconButton icon={faBook} href="/instructions">
          Instructions
        </IconButton>
        <IconButton icon={faGear} href="/settings">
          Settings
        </IconButton>
      </Navbar>

      <div className="flex justify-between max-w-[64rem] w-full flex-grow items-center">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-5xl font-semibold">Online Tic Tac Toe</h1>
          <a
            href="/game"
            className="bg-orange-400 w-fit hover:bg-orange-500 transition-colors font-semibold rounded-full py-2 px-4 uppercase"
          >
            Start Game - Online
          </a>
        </div>

        <div className="grid grid-rows-3 grid-cols-3 w-96 h-96 border-2 border-neutral-600">
          <div className="row-span-1 col-span-1 bg-orange-400" />
          <div className="row-span-1 col-span-1 bg-orange-200" />
          <div className="row-span-1 col-span-1 bg-orange-400" />
          <div className="row-span-1 col-span-1 bg-orange-200" />
          <div className="row-span-1 col-span-1 bg-orange-400" />
          <div className="row-span-1 col-span-1 bg-orange-200" />
          <div className="row-span-1 col-span-1 bg-orange-400" />
          <div className="row-span-1 col-span-1 bg-orange-200" />
          <div className="row-span-1 col-span-1 bg-orange-400" />
        </div>
      </div>
    </main>
  )
}
