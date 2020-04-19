import constant from '../../constant/Index'

const initialState = {
	data: [],
	fetching: false,
	fetchError: false
};

 function milk (state = initialState, action) {
	switch (action.type) {
		case constant.GET_MILK_START:
			return { ...state, 
				fetching: true 
			}
		case constant.GET_MILK_SUCCESS:

			return {
				...state,
				data: action.payload,
				fetching: false,
				fetchError: false
			}
		case constant.GET_MILK_FAILURE:
			return { ...state, 
				fetchError: true, 
				fetching: false 
			}
		default:
			return state
	}

}


export {milk}
