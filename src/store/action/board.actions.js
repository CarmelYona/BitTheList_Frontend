import { boardService } from "../../services/board.service.js"
import { filterByName } from "../../services/filter.service.js"

// Action Creators:
export function getActionLoadBoard(board) {
    return {
        type: 'SET_BOARD',
        board
    }
}

export function getActionLoadBoards(boards) {
    return {
        type: 'SET_BOARDS',
        boards
    }
}

export function getActionRemoveBoard(boardId) {
    return {
        type: 'REMOVE_BOARD',
        boardId
    }
}

export function getActionAddBoard(board) {
    return {
        type: 'ADD_BOARD',
        board
    }
}

export function getActionUpdateBoard(board) {
    return {
        type: 'UPDATE_BOARD',
        board
    }
}

export function getActionSetBoard(board) {
    return {
        type: 'UPDATE_BOARD',
        board
    }
}

var subscriber

export function loadBoard(boardId) {
    return (dispatch) => {
        boardService.getById(boardId)
            .then(board => {
                dispatch({
                    type: 'SET_BOARD',
                    board
                })
            })
            .catch(err => {
                console.log('Cannot load boards', err)
            })

        if (subscriber) boardService.unsubscribe(subscriber)
        subscriber = (ev) => {
            dispatch(ev.data)
        }
    }
}

export function loadBoards() {
    return async (dispatch) => {
        try {
            const boards = await boardService.query()
            dispatch(getActionLoadBoards(boards))
            return boards
        } catch (err) {
            console.log('Cannot load boards', err)
        }
    }
}

export function removeBoard(boardId) {
    return async (dispatch) => {
        try {
            await boardService.remove(boardId)
            dispatch(getActionSetBoard(boardId))
            return true
        } catch (err) {
            console.log('Cannot remove board', err)
            return false
        }
    }
}

export function addBoard(board) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.save(board)
            dispatch(getActionSetBoard(savedBoard))
            return savedBoard
        } catch (err) {
            console.log('Cannot add board', err)

            throw err
        }
    }

}

export function updateBoard(board) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.save(board)
            dispatch(getActionSetBoard(savedBoard))
            return savedBoard
        }
        catch (err) {
            console.log('Cannot add board', err)
        }
    }
}

export function setFilterBy(filterBy, boardId) {
    return async (dispatch) => {
        const board = await filterByName(filterBy, boardId)
        dispatch({ type: 'SET_BOARD', board })
    }
}

export function setOnScreenClick(isOnScreenClick) {
    return (dispatch) => {
        dispatch({ type: 'SET_IS_ON_SCREEN_CLICK', isOnScreenClick })
    }
}


