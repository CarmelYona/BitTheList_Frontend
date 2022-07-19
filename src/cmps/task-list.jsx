import { TaskPreview } from './task-preview'
import { Draggable } from 'react-beautiful-dnd'
export function TaskList({ board, group, onUpdateTask, onRemoveTask, onAddGroup, onAddTask, onSaveBoard }) {
    
    return (<>
        {group.tasks.map((task, idx) => {
            return (
                <Draggable draggableId={task.id} index={idx} key={task.id} >
                    {(provided) =>
                        <div className="task-list-drag" key={idx} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            <TaskPreview
                                onRemoveTask={onRemoveTask}
                                group={group}
                                onUpdateTask={onUpdateTask}
                                task={task}
                                board={board}
                                onAddGroup={onAddGroup}
                                onSaveBoard={onSaveBoard}
                                onAddTask={onAddTask}
                                idx={idx}
                            />
                            {provided.placeholder}
                        </div>
                    }
                </Draggable>
            )
        })}
    </>
    )
}