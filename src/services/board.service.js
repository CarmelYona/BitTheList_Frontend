import { utilService } from './util.service.js'
import { getActionUpdateBoard } from '../store/action/board.actions'
import { httpService } from './http.service.js'
import { socketService } from './socket.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'
const boardChannel = new BroadcastChannel('boardChannel')
var gCurrBoard

export const boardService = {
    query,
    getById,
    save,
    remove,
    subscribe,
    unsubscribe,
    setActivity,
    _buildBoard
}
window.cs = boardService

async function query() {
    const user = userService.getLoggedinUser()
    let boards = await httpService.get('board')
    if (!user) {
        boards = boards.filter(board => !board.ownerId)
        return boards
    } else {
        boards = boards.filter(board => board.ownerId === user._id)
        return boards
    }
}
function getById(boardId) {
    return httpService.get(`board/${boardId}`)
    // return storageService.get(STORAGE_KEY, boardId)
    // return axios.get(`/api/board/${boardId}`)
}
async function remove(boardId) {
    httpService.delete(`board/${boardId}`)
    // await storageService.remove(STORAGE_KEY, boardId)
    // boardChannel.postMessage(getActionRemoveBoard(boardId))
}

function setActivity(board, txt, from, to, style) {

    const createdAt = new Date()
    const activity = {
        byMember: {
            fullname: "guest",
            imgUrl: "",
            _id: "userId",
            createdAt: createdAt.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
        },
        from,
        to,
        id: utilService.makeId(),
        txt,
        createdAt: createdAt.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
        style
    }
    board.activities.unshift(activity)
    return board
}

async function save(board) {
    var savedBoard
    if (board._id) {
        boardChannel.postMessage(getActionUpdateBoard(savedBoard))
        const currBoard = await httpService.put(`board/:${board._id}`, board)
        socketService.emit('update board', currBoard)
        return currBoard
    } else {
        const newBoard = _buildBoard()
        const user = userService.getLoggedinUser()
        savedBoard = await httpService.post('board', newBoard)
        if (user) {
            user.boards.push(savedBoard._id)
            await userService.update(user)
        }
    }
    return savedBoard
}

function subscribe(listener) {
    boardChannel.addEventListener('message', listener)
}
function unsubscribe(listener) {
    boardChannel.removeEventListener('message', listener)
}


function _buildBoard() {
    const owner = userService.getLoggedinUser()
    const createdAt = new Date()
    const board = {
        ownerId: owner ? owner._id : null,
        activities: [],
        archivedAt: '',
        cmpsOrder: ["status-picker", "member-picker", "date-picker"],
        columns: ["text", "status", "priority", "date", "persons"],
        createdAt: createdAt.toLocaleTimeString(),
        createdBy: [],
        groups: [{
            id: utilService.makeId(),
            style: utilService.getRandomColor(),
            tasks: [{
                id: utilService.makeId(),
                title: "New item",
                text: "",
                status: "done",
                date: "",
                priority: "high",
                style: {
                    status: "rgb(0, 200, 117)",
                    priority: "rgb(0, 200, 117)"
                },
                updates: [{
                    byMember: {
                        fullname: "Carmel Yona",
                        imgUrl: "",
                        _id: "userId",
                        createdAt: createdAt
                    },
                    text: `Created at ${createdAt}  `,
                    isRead: false,
                }],
                persons: []
            }, {
                id: utilService.makeId(),
                title: "New item",
                text: "",
                status: "done",
                date: "",
                priority: "high",
                style: {
                    status: "rgb(0, 200, 117)",
                    priority: "rgb(0, 200, 117)"
                },
                updates: [{
                    byMember: {
                        fullname: "Carmel Yona",
                        imgUrl: "",
                        _id: "userId",
                        createdAt: createdAt
                    },
                    text: `Created at ${createdAt}  `,
                    isRead: false,
                }],
                persons: []
            }],
            title: 'Group 1'
        },
        {
            id: utilService.makeId(),
            style: utilService.getRandomColor(),
            tasks: [{
                id: utilService.makeId(),
                title: "New item",
                text: "",
                status: "done",
                date: "",
                priority: "high",
                style: {
                    status: "rgb(0, 200, 117)",
                    priority: "rgb(0, 200, 117)"
                },
                updates: [{
                    byMember: {
                        fullname: "Carmel Yona",
                        imgUrl: "",
                        _id: "userId",
                        createdAt: createdAt
                    },
                    text: `Created at ${createdAt}  `,
                    isRead: false,
                }],
                persons: []
            }, {
                id: utilService.makeId(),
                title: "New item",
                text: "",
                status: "done",
                date: "",
                priority: "high",
                style: {
                    status: "rgb(0, 200, 117)",
                    priority: "rgb(0, 200, 117)"
                },
                updates: [{
                    byMember: {
                        fullname: "Carmel Yona",
                        imgUrl: "",
                        _id: "userId",
                        createdAt: createdAt
                    },
                    text: `Created at ${createdAt}  `,
                    isRead: false,
                }],
                persons: []
            }],
            title: 'Group 2'
        }],
        persons: [
            {
                id: "u101",
                fullname: "Carmel Yona",
                imgUrl: "https://ca.slack-edge.com/T02SFLQBMS9-U02TP754YHH-119f03fb57ec-512"
            },
            {
                id: "u102",
                fullname: "Shani Eini",
                imgUrl: "https://ca.slack-edge.com/T02SFLQBMS9-U03273X77HS-f54656e9e28d-48"
            },
            {
                id: "u103",
                fullname: "Hallel Hofman",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Hoeffler_H.svg/1024px-Hoeffler_H.svg.png"
            }
        ],
        labels: utilService.getColors(),
        title: 'New Board'
    }
    return board
}