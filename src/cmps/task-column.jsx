import { useState, useRef } from "react"
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { Calendar } from 'react-date-range'
import { LabelsModal } from "./labels-modal"
import { ReactComponent as InviteSvg } from '../assets/svg/invite.svg'
import { ReactComponent as RemoveSvg } from '../assets/svg/remove.svg'
import { ReactComponent as Person } from '../assets/svg/person-column.svg'
import { useOutsideClick } from '../hooks/useClickOutsideParent'

export function TaskColumn({ board, boardColumn, task, setStatus, statusBgcColor, priorityBgcColor, setTxt, setMember, removeMember, addUser, handleSelect }) {
    const parentRef = useRef(null)
    const wrapperRef = useRef(null)
    const [isPriorityEdit, setPriorityEdit] = useState(false)
    const [isStatusEdit, setIsStatusEdit] = useState(false)
    const [isDateEdit, setIsDateEdit] = useState(false)
    const [isPersonsModal, setPersonsEdit] = useState(false)
    const [isInputOpen, setopenInput] = useState(false)
    const [user, setUser] = useState({ fullname: '' })

    const setColumn = (val) => {
        if (val === 'status') setIsStatusEdit(!isStatusEdit)
        if (val === 'priority') setPriorityEdit(!isPriorityEdit)
        if (val === 'persons') setPersonsEdit(!isPersonsModal)

    }
    useOutsideClick(wrapperRef, setPersonsEdit, false, parentRef)

    const openDateModal = () => {
        setIsDateEdit(!isDateEdit)
    }

    const onSubmit = (el) => {
        el.preventDefault()
        const name = { ...user.fullname.split('@') }
        addUser(name[0])
    }

    const handleChange = ({ target }) => {
        const field = target.name
        const { value } = target
        setUser({ ...user, [field]: value })
    }
    return <>
        {boardColumn === 'text' && <div onClick={() => setColumn(boardColumn)} className="task-column">
            <div
                suppressContentEditableWarning={true}
                contentEditable={true}
                onBlur={setTxt}
            >{task.text}
            </div>
        </div>}

        {/* status */}
        {boardColumn === 'status' && <div ref={parentRef} style={{ backgroundColor: task.style.status }} onClick={() => setColumn(boardColumn)} className="task-column task-column-status">
            {task.status !== 'none' && task.status}
            {isStatusEdit &&
                <div className="column-modal">
                    <LabelsModal
                        parentRef={parentRef}
                        setStatus={setStatus}
                        field={'status'}
                        closeModal={setColumn}
                    />
                </div>
            }
        </div>
        }


        {/* date */}
        {boardColumn === 'date' && <div onClick={() => openDateModal(openDateModal)} className="task-column">
            <div onClick={() => setIsDateEdit(!isDateEdit)}>{task.date}</div>
            {isDateEdit &&
                <div className="date-picker">
                    <Calendar date={new Date()}
                        onChange={handleSelect} />
                </div>
            }
        </div>}
        {/* persons */}
        {boardColumn === 'persons' && <div ref={parentRef} onClick={() => setColumn('persons')} className="task-column member-col">
            <div className="add-member flex">
                {task.persons && (task.persons.length > 0) ?
                    <div className="person-display-container">
                        <img src={task.persons[task.persons.length - 1].imgUrl} />
                        {task.persons.length > 1 && <div className="person-icon flex">+ {task.persons.length - 1}</div>}
                    </div>
                    :
                    <div className="profile-icon flex"><Person /></div>
                }
            </div>
        </div>}
        {isPersonsModal &&
            <div ref={wrapperRef} className="person-menu menu-modal flex column">
                <div className="person-menu flex column">
                    <div className="item-member-list flex">
                        {task.persons.map((person, idx) => {
                            return <div key={idx} className="member-box flex ">
                                <img src={person.imgUrl} />
                                {person.fullname}
                                <div onClick={() => removeMember(idx)} className="svg flex"> <RemoveSvg /></div>
                            </div>
                        })}
                    </div>
                    <div className="search-persons"><input type="text" placeholder="Enter name" /></div>
                    <div className="divider"></div>
                    {board.persons && board.persons.map((person, idx) => {
                        {
                            const taskPersons = Array.from(task.persons.map(person => person.fullname))
                            return !taskPersons.includes(person.fullname) &&
                                < div onClick={(ev) => setMember(ev, person)} className="wrapper" key={idx}>
                                    <div className="add-member-box flex">
                                        <div className="img-user flex">
                                            <img src={person.imgUrl} />
                                        </div>
                                        <div className="user-full-name flex">{person.fullname}</div>
                                    </div>
                                </div>
                        }
                    })
                    }
                    <div
                        onClick={() => setopenInput(!isInputOpen)}
                        className="invite flex">
                        <InviteSvg />
                        Invite a new member by username
                    </div>
                    {isInputOpen &&
                        <div className="invite-modal">
                            <form onSubmit={onSubmit}>
                                <input
                                    type='text'
                                    placeholder="Invite by email"
                                    value={user.fullname}
                                    name='fullname'
                                    onChange={handleChange}>
                                </input>
                            </form>
                        </div>
                    }
                </div>
            </div>
        }
        {/* priority */}
        {
            boardColumn === 'priority' && <div ref={parentRef} style={{ backgroundColor: task.style.priority }} onClick={() => setColumn(boardColumn)} className="task-column task-column-status">
                {task.priority !== 'none' && task.priority}
                {isPriorityEdit &&
                    <div className="column-modal">
                        <LabelsModal
                            parentRef={parentRef}
                            setStatus={setStatus}
                            field={'priority'}
                            closeModal={setColumn}
                        />
                    </div>
                }
            </div>
        }
    </>
}