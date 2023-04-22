const appReducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE_LANGUAGE': {
            return {
                ...state,
                language: action.payload
            }
        }
        case 'CHANGE_THEME': {
            return {
                ...state,
                theme: action.payload
            }
        }
        case 'TOGGLE_SIDEBAR': {
            return {
                ...state,
                showSidebar : !state.showSidebar
            }
        }
    }
}

export default appReducer;