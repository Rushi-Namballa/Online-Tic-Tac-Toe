import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import {
  faSnowflake,
  faSleigh,
  faHippo,
  faOtter,
  faKiwiBird,
  faPaw,
  faDog,
  faDragon,
  faShrimp,
  faFish,
  faFeather,
  faSackDollar,
  faHouse,
  faCamera,
  faTruck,
  faFontAwesome,
  faFlask,
  faFireFlameCurved,
  faWebAwesome,
  faCrow,
  faHeart,
  faBroom,
  faFaceGrinSquintTears,
  faBell,
} from "@fortawesome/free-solid-svg-icons"

export const markers: IconDefinition[] = [
  faSnowflake,
  faSleigh,
  faHippo,
  faOtter,
  faKiwiBird,
  faPaw,
  faDog,
  faDragon,
  faShrimp,
  faFish,
  faFeather,
  faSackDollar,
  faHouse,
  faCamera,
  faTruck,
  faFontAwesome,
  faFlask,
  faFireFlameCurved,
  faWebAwesome,
  faCrow,
  faHeart,
  faBroom,
  faFaceGrinSquintTears,
  faBell,
]

export function getGameData() {
  if (typeof window === "undefined") return null

  if (window.localStorage.getItem("settings") == null) {
    const gameData = {
      name: `Guest #${Math.floor(Math.random() * 99)}`,
      marker: markers[Math.floor(Math.random() * markers.length)].iconName,
    }

    window.localStorage.setItem("settings", JSON.stringify(gameData))

    return gameData
  }

  return JSON.parse(window.localStorage.getItem("settings")!)
}
