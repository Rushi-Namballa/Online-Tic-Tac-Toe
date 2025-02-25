import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactNode } from "react"
import merge from "../utilities/tailwind"

interface Props {
  children: ReactNode
  icon: IconDefinition
  className?: string
  href?: string
}

export default function IconButton({ children, className, icon, href }: Props) {
  const Tag = href ? "a" : "button"
  return (
    <Tag
      href={href}
      className={merge(
        className,
        "hover:text-neutral-200 transition-colors items-center flex gap-2"
      )}
    >
      <FontAwesomeIcon icon={icon} />
      {children}
    </Tag>
  )
}
