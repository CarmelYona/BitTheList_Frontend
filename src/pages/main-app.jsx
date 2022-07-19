import { useState } from 'react'
import { AppSideBar } from '../cmps/app-side-bar'
import { BoardController } from '../cmps/board-controller'
import { Board } from '../cmps/board'
import { useDispatch } from 'react-redux'

export const MainApp = () => {
    const dispatch = useDispatch()
    const [isPinned, setIsPinned] = useState(false)
    const [isScreenClick, setIsScreenClick] = useState(false)
    const onSetIsPinned = () => {
        setIsPinned(!isPinned)
    }

    return (
        <main onClick={() => setIsScreenClick(false)} className="application">
            <div className="app-wrapper">
                <div className="base-layer">
                    <AppSideBar />
                    <div className="app-base-surface"></div>
                </div>
                <section className="work-space">
                    <BoardController
                        isPinned={isPinned}
                        onSetIsPinned={onSetIsPinned}
                    />
                    <Board isPinned={isPinned} />
                </section>
            </div>
        </main>
    )
}
