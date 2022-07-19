import { useState } from "react"
import { useFormRegister } from "../hooks/useFormRegister"
import { ReactComponent as ArrowSvg } from '../assets/svg/arrow.svg'
import { FaRegUserCircle } from 'react-icons/fa';
import { MdArrowDropDown } from 'react-icons/md';
import { MdOutlineWeb } from 'react-icons/md';
import { useParams } from 'react-router-dom'
import { sort } from '../services/filter.service'

export const BoardFilter = ({ onAddGroup, onChangeFilter, onAddTask, board }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isNewItemOpen, setIsNewItemOpen] = useState(false)
    const [isSortOpen, setIsSortOpen] = useState(false)
    const params = useParams()

    const toggle = (val) => {
        if (val === 'person-modal') {
            setIsModalOpen(isModalOpen ? false : true)
        }
        if (val === 'new-item-btn') {
            setIsNewItemOpen(isNewItemOpen ? false : true)
        }
        if (val === 'sort-modal') {
            setIsSortOpen(isSortOpen ? false : true)
            sort(board.groups, 'text')
        }
    }

    const [register] = useFormRegister({
        filterBy: {
            title: '',
            boardId: params.id
        },
    }, onChangeFilter)


    const onUseBtnFilter = (val, group) => {
        if (val === 'add') {
            const addTask = { ...group }
            addTask.id = null
            addTask.title = 'New item'
            onAddTask(board, board.groups[0].id, addTask)
        }
    }

    const getPerson = (person) => {
        const filterBy = {
            person
        }
        onChangeFilter(filterBy)
    }

    return (
        <div className="header-bottom-main-wrapper">
            <div className="new-item-wraper flex">
                <div onClick={() => onUseBtnFilter('add', board.groups[0].id)} className="new-item-btn flex">New Item</div>
                <div className="new-item-modal-btn-wrpper">
                    <div onClick={() => toggle('new-item-btn')} className="new-item-modal-btn"><ArrowSvg /></div>
                </div>
            </div >
            {isNewItemOpen &&
                <div className="menu-new-item-modal">
                    <div onClick={() => onAddGroup()} className="item-modal-add-group">  <MdOutlineWeb /> <span> New group of items</span></div>
                </div>
            }

            <div className="search-wrapper">
                <input className="search-input" placeholder=" Search"  {...register('title')} />
            </div>
            <div className="filter-wrapper">
                <div className="filter-btn" onClick={() => toggle('person-modal')}><FaRegUserCircle /> <span>persons</span> </div>
            </div>
            {isModalOpen &&
                <div className="person-modal" onBlur={() => toggle('person-modal')}>
                    <p className="first-txt-modal">Quick person filter</p>
                    <p className="second-txt-modal">Filter items and subitems by person</p>
                    {board.persons && board.persons.map((person, idx) => {
                        return <div onClick={() => getPerson(person)} key={idx} className="person-link flex" href=""><img className="person-img" src={person.imgUrl} />{person.fullname}</div>
                    })}

                </div>
            }
            {isSortOpen &&
                <div className="modal-sort-menu">
                    <div className="modal-sort-header">
                        Sort by
                        <div className="sort-right-header">
                            <div className="clear-btn">Reset sort</div>
                            <div onClick={() => sort()} className="sort-btn">Sort</div>
                        </div>
                    </div>
                    <div className="modal-sort-main">
                        <div className="btn-sort-content">
                            <div className="by-text">Text <MdArrowDropDown /></div>
                        </div>
                        <div className="by-order"> Acending<MdArrowDropDown /></div>
                    </div>
                </div>
            }
        </div>
    )
}
<img src={require(`../assets/img/carmel.png`)} />
