import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Board } from '../assets/svg/board.svg'

export const BoardList = ({ boards, onRemoveBoard }) => {

    return (
        <Fragment>
            {boards.map(board =>
                <NavLink key={board._id}
                    className={(navData) => (navData.isActive ? 'active' : '')}
                    to={`/board/${board._id}`}>
                    <div className="board-preview-card-wrapper">
                        <div className="board-preview-card">
                            <div className="board-icon"><Board /></div>
                            <div className="board-title-container">
                                <div className="board-title">{board.title}</div>
                                <div onClick={() => onRemoveBoard(board._id)} className="board-dropdown-menu"></div>
                            </div>
                        </div>
                    </div>
                </NavLink>
            )}
        </Fragment>
    )
}