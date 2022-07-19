import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { boardService } from '../services/board.service.js'

export const HomePage = () => {
    const [boards, setBoards] = useState(null)

    useEffect(() => {
        loadBoards()
    }, [])

    const loadBoards = async () => {
        const boards = await boardService.query()
        if (!boards.length) {
            await boardService.save({})
            loadBoards()
        }
        setBoards(boards)
    }


    return (
        <div className="home-container" >
            <div className="main-header">
                <div className="header-content">
                    <div className="left-content">
                        <div className="logo">
                            <img className="logo-img" src="https://cdn.icon-icons.com/icons2/2699/PNG/512/monday_logo_icon_168967.png" alt="" />
                            <div className="logo-title"> Bit The List</div>
                        </div>
                    </div>
                    <div className="right-content">
                        <Link to={'/login'} className="login" href="">Log in</Link>
                        <Link to={'/signup'} className="signup" >Signup</Link>
                        {boards && <Link to={`/board/${boards[0]._id}`}> <div className="started-btn">Get Started</div></Link>}
                    </div>
                </div>
            </div>
            <main className="home-page-body">
                <div className="main-home-page">
                    <div className="home-page">
                        <div className="head-line">
                            <h1 className="head-line-title">Work Without Limits</h1>
                            <h2 className="head-line-title-sub">Easily build, run, and scale your dream workflows on one platform. what would you like to manage with us?</h2>
                        </div>
                        {boards && <Link to={`/board/${boards[0]._id}`}> <div className="get-started-btn">Get Started</div></Link>}
                    </div>
                </div>
            </main>
        </div>
    )
}
