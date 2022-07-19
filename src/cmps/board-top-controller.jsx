import { useState, useRef } from "react"
import { useOutsideClick } from '../hooks/useClickOutsideParent'
import { ReactComponent as Plus } from '../assets/svg/plus-sign.svg'
import { ReactComponent as Lightning } from '../assets/svg/lightning.svg'
import { ReactComponent as Magnifier } from '../assets/svg/magnifier.svg'
import { ReactComponent as BoardSvg } from '../assets/svg/board.svg'

export function BoardTopController({ addBoard }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const wrapperRef = useRef(null)
    const parentRef = useRef(null)
    useOutsideClick(wrapperRef, setIsAddModalOpen, null, parentRef)

    return (
        <>
            <div ref={parentRef} onClick={() => setIsAddModalOpen(!isAddModalOpen)} className="btn-add"><Plus /><span>Add</span> {
                isAddModalOpen &&
                <div ref={wrapperRef} className="board-add-modal">
                    <div className="btns-top-add-modal">
                        <div className="btn-modal-top-add-section" onClick={() => addBoard()}>
                            <BoardSvg />
                            <span> New Board</span>
                        </div>
                    </div>
                </div>
            }</div>
        </>
    )
}