import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import IconButton from "../components/IconButton"
import Navbar from "../Navbar"

export default function InstructionsPage() {
  return (
    <main className="flex flex-col w-screen h-screen items-center">
      <Navbar title="Instructions">
        <IconButton
          icon={faArrowLeft}
          className="hover:gap-2.5 transition-all"
          href="/"
        >
          Return
        </IconButton>
      </Navbar>

      <div className="mt-8 rounded-lg bg-orange-400 border border-neutral-600 p-8 max-w-prose">
        <ol className="list-decimal text-neutral-200 font-light [&>li>span]:text-white [&>li>span]:font-medium text-lg flex flex-col gap-4">
          <li>
            <span>Player Names:</span> To give yourself a name, navigate to
            settings and type your nametag in the designated box.
          </li>

          <li>
            <span>Marker Customization:</span> Navigate to settings and click on
            the marker customization box. Here, you can choose from the default
            options or upload your own.
          </li>

          <li>
            <span>Start Game:</span> Click "Start Game - Online"
          </li>

          <li>
            <span>Gameplay:</span> When it is your turn, click on the box you
            want to place your marker on. Then, click on "Confirm Move" to lock
            your choice in.
          </li>

          <li>
            <span>Chat:</span> Type in the chat to communicate with your
            opponent and click "enter" to send message.
          </li>

          <li>
            <span>Reset Game:</span> To reset game, click the reset game icon.
          </li>
        </ol>
      </div>
    </main>
  )
}
