import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { boardService } from '../services/board.service'
import { BoardPreview } from './board-preview-contoller'
import { BoardTopController } from './board-top-controller'
import home from '../assets/img/home.png'
import { ReactComponent as MyWork } from '../assets/svg/my-work.svg'
import { FiActivity } from 'react-icons/fi'
import { ActivityLog } from './acttivity'
import { loadBoards } from '../store/action/board.actions.js'
import { useDispatch, useSelector } from 'react-redux'

export const BoardController = ({ onSetIsPinned, isPinned }) => {
    const params = useParams()
    const naviget = useNavigate()
    const dispatch = useDispatch()
    const [isExpend, setIsExpend] = useState(false)
    const [isActivityOpen, setActivityOpen] = useState(false)
    const [board, setBoard] = useState(null)
    let { boards } = useSelector((storeState) => storeState.boardModule)
    useEffect(() => {
        onLoadBoards()
        loadBoard()
    }, [])

    const onLoadBoards = async () => {
        await dispatch(loadBoards())
    }
    const loadBoard = async () => {
        const board = await boardService.getById(params.id)
        setBoard(board)
    }
    const addBoard = async () => {
        await boardService.save({})
        onLoadBoards()
    }

    const removeBoard = async (boardId) => {
        await boardService.remove(boardId)
        onLoadBoards()
    }

    const toHomePage = () => {
        naviget("/")
    }

    return (
        <main
            className={`board-controller ${isExpend ? 'expend' : ''} ${isPinned ? 'pinned' : ''}`}>
            <div className={`controller-btn  ${isPinned ? 'pinned' : ''} `}
                onClick={onSetIsPinned}>
                {isPinned ? '<' : '>'}
            </div>
            <div className={`controller-container ${isExpend ? 'expend' : ''} ${isPinned ? 'pinned' : ''}`}>
                <div className="controller-top">
                    <div className="controller-top-top">
                        <div className="dropdown-navigation-header-container">
                            <span className="title">Workspace</span>
                            <div className="dropdown-navigation">⋯</div>
                        </div>
                        <div className="work-space-dropdown">
                            <div className="name-container">
                                <div className="work-space-avatar">M</div>
                                <span >Main workspace</span>
                            </div>
                            <div className="open-drop-down" >&lt;</div>
                        </div>
                    </div>
                    <div className="controller-top-bottom">
                        <BoardTopController addBoard={addBoard} />
                    </div >
                    <div className="spacer"></div>
                </div >
                <div className="controller-bottom">
                    <div className="board-list-container">
                        {
                            boards && boards.map((board, idx) => {
                                return <div className="boards-list-wraper flex column" key={idx}>
                                    <BoardPreview board={board} idx={idx} removeBoard={removeBoard} />
                                </div>
                            })
                        }
                    </div >
                </div >
            </div >

            <div className="footer-wrapper ">

                <div onClick={toHomePage} className="home-btn flex column">
                    <img className="home-img" src={home} />
                    <div className="home">Home</div>
                </div>

                <div onClick={() => setIsExpend(!isExpend)} className="my-work-btn flex column">
                    <div ><MyWork /></div>
                    <div>My Work</div>
                </div>

                <div onClick={() => setActivityOpen(!isActivityOpen)} className="activity-btn flex column">
                    <div className="activity-icon"><FiActivity /></div>
                    <div>Activity</div>
                </div>
            </div>
            {isActivityOpen &&
                <ActivityLog board={board} setActivityOpen={setActivityOpen} />
            }
        </main >
    )
}