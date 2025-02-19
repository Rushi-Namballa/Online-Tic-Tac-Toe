import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

interface Props {
    icon: IconDefinition;
    children: ReactNode
}

export default function IconButton({children, icon}: Props) {
    return <button className="flex items-center gap-2">
        <FontAwesomeIcon icon={icon} />
        {children}
    </button>
}