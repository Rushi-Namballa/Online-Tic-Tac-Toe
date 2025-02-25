import { ReactNode } from "react"

interface Props {
  children: ReactNode
  title?: ReactNode
}

export default function Navbar({ children, title }: Props) {
  return (
    <header className="flex px-12 justify-between w-full items-center h-16 relative bg-orange-500">
      <span className="font-semibold text-2xl">Online Tic Tac Toe</span>
      {title && (
        <span className="font-medium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
          {title}
        </span>
      )}
      <div className="flex gap-8">{children}</div>
    </header>
  )
}
