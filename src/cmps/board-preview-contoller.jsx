import { useState, useRef } from "react"
import { NavLink } from "react-router-dom"
import { useOutsideClick } from '../hooks/useClickOutsideParent'
import { ReactComponent as Board } from '../assets/svg/board.svg'
import { RiDeleteBin2Line } from 'react-icons/ri'

export function BoardPreview({ board, idx, removeBoard }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const wrapperRef = useRef(null)
    const parentRef = useRef(null)
    useOutsideClick(wrapperRef, setIsAddModalOpen, null, parentRef)

    return <div>
        <div className="board-preview">
            <NavLink
                className={(navData) => (navData.isActive ? 'active' : '')}
                to={`/board/${board._id}`}>
                <div key={idx} className="board-preview-card-wrapper">
                    <div className="board-preview-card">
                        <div className="board-icon"><Board /></div>
                        <div className="board-title-container">
                            <div className="board-title">{board.title}</div>
                            <div className="delete-btn" onClick={(ev) => removeBoard(board._id, ev.preventDefault())}><RiDeleteBin2Line/></div>
                        </div>
                    </div>
                </div>
            </NavLink>
        </div >
    </div >

}