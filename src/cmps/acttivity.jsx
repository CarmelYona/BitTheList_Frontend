import { useState } from 'react'
import { ReactComponent as CloseBtn } from '../assets/svg/close.svg'
import { ActivityModal } from './modal-cmp'
import { useSelector } from 'react-redux'

export function ActivityLog({ board, setActivityOpen }) {
    const [isShown, setIsShown] = useState(false)
    let { user } = useSelector((storeState) => storeState.userModule)

    return <div className="activity-log-panel flex">

        <div className="activity-log-header ">
            <div onClick={() => setActivityOpen(false)} className="activity-log-close-btn">
                <CloseBtn />
            </div>
            <div className="activity-title flex">{board.title} log</div>
            <div className="tabs-wrapper flex">
                <div onClick={() => setIsShown(true)} className={`activity-tab ${isShown ? 'shown' : ''}`}>Activity</div>
                <div onClick={() => setIsShown(false)} className={`update-tab  ${isShown ? '' : 'shown'}`}>Updates</div>
            </div>
        </div>


        <div className={`update-wrapper flex column  ${isShown ? '' : 'shown'} `}>
            <div className="updates-wrapper-cards flex column">
                {board.updates && board.updates.map((update, idx) =>
                    <div className="update-card" key={idx}>
                        <div className="update-header flex">{user ? user.username : "guest"}</div>
                        <div className="body-text">{update.text}</div>
                    </div>
                )}
            </div>
        </div>

        <div className={`activity-log-wrapper flex column ${isShown ? 'shown' : ''}`}>
            {board.activities.map((activity, idx) => {
                return <ActivityModal activity={activity} key={idx} />
            })}
        </div>
    </div>
}