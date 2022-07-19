import { taskService } from "../../services/task.service"

export function saveTask(board, groupId, task) { 
    return async (dispatch) => {
        try {
            const actionType = 'SET_BOARD'
            const savedTask = await taskService.saveTask(board, groupId, task)
            dispatch({
                type: actionType,
                task: savedTask
            })
        } catch (err) {
            throw err
        }
    }
}
