const initialState = {
    board: {},
    boards: [],
    isOnScreenClick: false
}
export function boardReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case 'SET_BOARDS':
            newState = { ...state, boards: action.boards }
            break
        case 'SET_BOARD':
            newState = { ...state, board: action.board }
            break
        case 'REMOVE_BOARD':
            newState = { ...state, board: null }
            break
        case 'ADD_BOARD':
            newState = { ...state, board: [...state.board, action.board] }
            break
        case 'UPDATE_BOARD':
            newState = { ...state, board: action.board }
            break
        case 'SET_IS_ON_SCREEN_CLICK':
            newState = { ...state, isOnScreenClick: [...state.isOnScreenClick, action.isOnScreenClick] }
            break
        default:

    }
    // For debug:
    window.boardState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)
    return newState

}
