import { faBookOpen, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import IconButton from "./IconButton";

export default function Home() {
  return (
    <div className="bg-orange-200 h-screen w-screen text-neutral-100 flex flex-col items-center">
      <header className="shadow h-12 w-full flex items-center justify-between px-12 bg-orange-400">
        <h1>Online Tic Tac Toe</h1>

        <div className="flex gap-4">
          <IconButton icon={faBookOpen}>
            Instructions
          </IconButton>

          <IconButton icon={faGear}>
            Settings
          </IconButton>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center gap-64">
        <div className="flex flex-col items-center gap-4">
          <span className="text-3xl font-bold text-neutral-700">Online Tic Tac Toe</span>
          <button className="bg-amber-500 rounded-full px-4 py-2">Start Game - Online</button>
        </div>

        <div className="grid w-96 h-96 border-2 border-neutral-500 grid-cols-3 grid-rows-3">
          <div className="bg-orange-300" />
          <div className="bg-orange-400" />
          <div className="bg-orange-300" />
          <div className="bg-orange-400" />
          <div className="bg-orange-300" />
          <div className="bg-orange-400" />
          <div className="bg-orange-300" />
          <div className="bg-orange-400" />
          <div className="bg-orange-300" />
        </div>
      </main>
    </div>
  );
}

