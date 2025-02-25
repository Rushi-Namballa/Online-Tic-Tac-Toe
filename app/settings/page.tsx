"use client"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import IconButton from "../components/IconButton"
import Navbar from "../Navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getGameData, markers } from "../common"
import { useEffect, useRef, useState } from "react"
import merge from "../utilities/tailwind"

export default function SettingsPage() {
  const settings = getGameData()
  const [markerState, setMarker] = useState(settings?.marker)
  const [nameState, setName] = useState(settings?.name)

  useEffect(() => {
    window.localStorage.setItem(
      "settings",
      JSON.stringify({
        name: nameState,
        marker: markerState,
      })
    )
  }, [markerState, nameState])

  return (
    <main className="flex flex-col w-screen h-screen items-center">
      <Navbar title="Settings">
        <IconButton
          icon={faArrowLeft}
          className="hover:gap-2.5 transition-all"
          href="/"
        >
          Return
        </IconButton>
      </Navbar>

      <form className="mt-8 rounded-lg bg-orange-400 border border-neutral-600 p-8 max-w-prose flex flex-col gap-8">
        <div className="flex gap-4">
          Player Name:
          <input
            type="text"
            className="border-b bg-transparent text-neutral-800 outline-none focus:border-neutral-700 border-neutral-500"
            value={nameState}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          Marker Customization
          <div className="grid grid-cols-6 gap-2 grid-rows-4">
            {markers.map((marker) => (
              <button
                key={marker.iconName}
                type="button"
                className={merge(
                  marker.iconName === markerState &&
                    "shadow-md text-orange-600 bg-orange-300",
                  "w-12 h-12 flex items-center justify-center text-neutral-700 transition-all hover:bottom-0.5 hover:text-orange-700 relative text-lg hover:shadow-lg hover:bg-orange-300 rounded-lg bg-orange-200"
                )}
                onClick={() => setMarker(marker.iconName)}
              >
                <FontAwesomeIcon icon={marker} />
              </button>
            ))}
          </div>
        </div>
      </form>
    </main>
  )
}
