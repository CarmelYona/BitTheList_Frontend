import { ReactComponent as Time } from '../assets/svg/time.svg'
import userImg from '../assets/img/carmel.png'
import { useSelector } from 'react-redux'

export function ActivityModal({ activity, }) {
    let { user } = useSelector((storeState) => storeState.userModule)

    return <div className="single-activity flex" >
        <div className="activity-box flex">
            <div className="activity-time flex">
                <Time />
                <div>{activity.createdAt}</div>
            </div>
            <div className="activity-member flex">
                <img src={userImg} />
                {user?user.username:"guest"}
            </div>
            <div className="activity flex">
                {activity.txt}
            </div>
            {activity.from &&
                <div className="activity-info flex" >
                    <div className="from flex" style={activity.style && { backgroundColor: activity.style.from }}>
                        {activity.from}
                    </div>
                    <div className="arrow-to">{'>'}</div>
                    <div className="to flex" style={activity.style && { backgroundColor: activity.style.to }}>
                        {activity.to}
                    </div>
                </div>
            }
        </div>
    </div>
}