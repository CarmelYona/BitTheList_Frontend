import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BoardHeader } from './board-header'
import { BoardContent } from './board-group'
import { loadBoard, setFilterBy, updateBoard, loadBoards } from '../store/action/board.actions'
import { taskService } from '../services/task.service'
import { groupService } from '../services/group.service'
import { boardService } from '../services/board.service'
import { useDispatch, useSelector } from 'react-redux'
import { socketService } from '../services/socket.service'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

export const Board = ({ isPinned }) => {
    const params = useParams()
    let { board } = useSelector((storeState) => storeState.boardModule)
    const dispatch = useDispatch()
    useEffect(() => {
        socketService.off('update board', onLoadBoard)
        socketService.on('update board', onLoadBoard)
        onLoadBoard()
        return (() => {
            socketService.off('update board', onLoadBoard)
        })
    }, [params.id])

    const onLoadBoard = async () => {
        await dispatch(loadBoard(params.id))
    }

    const calcProgress = (newBoard) => {
        let progress
        board = newBoard ? newBoard : board
        board.groups.map(group => {
            progress = group.tasks.reduce((acc, task) => {
                if (acc[task.status]) acc[task.status] += 1
                else acc[task.status] = 1
                return acc
            }, {})
            group.progress = progress
        })
        return progress
    }

    const onRemoveGroup = async (groupId) => {
        const updateBoard = boardService.setActivity(board, 'Removed group')
        await groupService.remove(groupId, updateBoard)
    }

    const onAddGroup = async (group) => {
        if (group) {
            const updateBoard = boardService.setActivity(board, 'Updated group')
            await groupService.saveGroup(updateBoard, group)
            return
        }
        const updateBoard = boardService.setActivity(board, 'Added group')
        await groupService.saveGroup(updateBoard)
    }

    const onAddTask = async (board, groupId, task) => {
        const updateBoard = boardService.setActivity(board, 'Added task')
        calcProgress()
        await taskService.saveTask(updateBoard, groupId, task)
    }

    const onUpdateTask = async (task, groupId, board) => {
        const updateBoard = boardService.setActivity(board, 'Updated task')
        await taskService.saveTask(updateBoard, groupId, task)
        calcProgress()
    }

    const onRemoveTask = async (groupId, taskId) => {
        const updateBoard = boardService.setActivity(board, 'Removed task')
        await taskService.remove(groupId, taskId, updateBoard)
        calcProgress()
    }

    const onChangeFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy, params.id))
    }

    const getPersons = () => {
        const persons = board.persons
    }


    const onSaveBoard = async (newBoard) => {
        await boardService.save(newBoard)
        calcProgress(newBoard)
        dispatch(updateBoard(newBoard))
        dispatch(loadBoards())
    }


    const newBoard = JSON.parse(JSON.stringify(board))
    function handleOnDragEnd(res) {
        if (!res.destination) return
        const groupSource = newBoard.groups.find(group => group.id === res.source.droppableId)
        if (res.destination.droppableId !== res.source.droppableId) {
            const groupDestination = newBoard.groups.find(group => group.id === res.destination.droppableId)
            const [task] = groupSource.tasks.splice(res.source.index, 1)
            groupDestination.tasks.splice(res.destination.index, 0, task)
        } else {
            const [task] = groupSource.tasks.splice(res.source.index, 1)
            groupSource.tasks.splice(res.destination.index, 0, task)
        }
        onSaveBoard(newBoard)
    }

    if (!newBoard) return <div>loading..</div>
    return (
        <section className={`board ${isPinned ? ' board-controller-pinned' : ''}`}>
            <div className="board-container">
                <div className="board-wrapper flex">
                    <BoardHeader
                        onAddGroup={onAddGroup}
                        onChangeFilter={onChangeFilter}
                        getPersons={getPersons}
                        board={board}
                        onSaveBoard={onSaveBoard}
                        onAddTask={onAddTask}
                    />

                    <div className="board-content">
                        <div className="board-content-container">
                            <div className="border-content-wrapper">
                                <DragDropContext onDragEnd={handleOnDragEnd} id={board._id}>
                                    {newBoard && newBoard.groups?.map((group, idx) =>
                                        <Droppable droppableId={group.id} key={group.id} index={idx} type="gro">
                                            {(provided) =>
                                                <div key={group.id} className="task-list-drag" {...provided.droppableProps} ref={provided.innerRef} >
                                                    < BoardContent
                                                        onRemoveGroup={onRemoveGroup}
                                                        onAddTask={onAddTask}
                                                        onUpdateTask={onUpdateTask}
                                                        onRemoveTask={onRemoveTask}
                                                        group={group}
                                                        columns={board.columns}
                                                        key={idx}
                                                        onAddGroup={onAddGroup}
                                                        onSaveBoard={onSaveBoard}
                                                        provided={provided}
                                                    />
                                                    {provided.placeholder}
                                                </div>
                                            }
                                        </Droppable>
                                    )}
                                </DragDropContext>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

