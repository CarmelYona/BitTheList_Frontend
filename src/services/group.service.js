import { boardService } from "./board.service"
import { utilService } from "./util.service"
import { loadBoard } from "../store/action/board.actions"

export const groupService = {
    saveGroup,
    remove,
}

async function saveGroup(board, updateGroup) {
    let newGroup
    if (updateGroup) {
        if (!updateGroup.id) {
            updateGroup.title += ' copy'
            updateGroup.id = utilService.makeId()
            updateGroup.tasks.map(task => task.id = utilService.makeId())
            board.groups.unshift(updateGroup)
        }
        const idx = board.groups.findIndex(group => group.id === updateGroup.id)
        board.groups[idx] = updateGroup
    } else {
        newGroup = {
            id: utilService.makeId(),
            archivedAt: 'hour ago',
            style: utilService.getRandomColor(),
            tasks: [],
            title: 'Group ' + (board.groups.length + 1),
            progress: [],
        }
        board.groups.unshift(newGroup)
    }
    return boardService.save(board)
}

function remove(id, board) {
    const idx = board.groups.findIndex(group => group.id === id)
    board.groups.splice(idx, 1)
    return boardService.save(board)
}