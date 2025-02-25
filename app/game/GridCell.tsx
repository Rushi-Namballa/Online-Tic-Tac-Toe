import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getGameData, markers } from "../common"
import merge from "../utilities/tailwind"

interface Props {
  dark: boolean
  marker?: string
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export default function GridCell({
  className,
  dark,
  marker,
  disabled,
  onClick,
}: Props) {
  const data = getGameData()

  return (
    <button
      className={merge(
        dark ? "bg-orange-400" : "bg-amber-200",
        className,
        "row-span-1 col-span-1 outline-none flex items-center justify-center text-5xl group"
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {!disabled && data && marker == null && (
        <FontAwesomeIcon
          className="group-hover:opacity-75 opacity-0"
          icon={markers.find((i) => i.iconName == data.marker)!}
        />
      )}

      {marker && (
        <FontAwesomeIcon icon={markers.find((i) => i.iconName == marker)!} />
      )}
    </button>
  )
}
