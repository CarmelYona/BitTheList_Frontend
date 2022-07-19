import { useState, useRef } from 'react'
import { useOutsideClick } from '../hooks/useClickOutsideParent'

export function TaskEdit({ task, onUpdateTask, group, toggle, board }) {
    const [NewTitle, setNewTitle] = useState(task.title)
    const [isNewTaskEdit, setIsNewTaskEdit] = useState(false)
    const wrapperRef = useRef(null)
    const parentRef = useRef(null)
    const handleKeyPressAddTask = (event) => {
        if (event.key === 'Enter') {
            onSaveTask(event)
        }
    }
    const onSaveTask = () => {
        task.title = NewTitle
        onUpdateTask(task, group.id, board)
        setIsNewTaskEdit(false)
    }
    useOutsideClick(wrapperRef, onSaveTask, NewTitle, null)
    const handleChange = ({ target }) => {
        const newTitle = target.value
        setNewTitle(newTitle)
    }
    const inputRef = (elInput) => {
        if (elInput) elInput.focus()
    }
    return (
        <div className="title-component">
            {!isNewTaskEdit ?
                <>
                    <div ref={parentRef} className="edit-icon-wrapper">
                        <button
                            className="btn  edit-icon"
                            onClick={(ev) => setIsNewTaskEdit(!isNewTaskEdit)} >
                            Edit
                        </button>
                    </div>
                    <div>
                        <div className="btn-input">
                            {task.title}
                        </div>
                    </div>
                </>
                :
                <form
                    ref={wrapperRef}
                    className="input-edit-state"
                    onSubmit={(e) => onSaveTask(e.preventDefault())}>
                    <input ref={inputRef} onKeyPress={handleKeyPressAddTask}
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={NewTitle}
                    />
                </form>
            }
        </div >
    )
}