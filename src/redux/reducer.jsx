const initialState = {
	sideBar: false,
	messageChatBackground: 'https://images4.alphacoders.com/973/973967.jpg'
}

export const SideBareReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'OPEN_SIDEBAR':
			return { ...state, sideBar: true }
		case 'CLOSE_SIDEBAR':
			return { ...state, sideBar: false }
		case 'TOGGLE_SIDEBAR':
			return { ...state, sideBar: !state.sideBar }

		default:
			return state
	}
}
