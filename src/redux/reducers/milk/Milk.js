import constant from '../../constant/Index'

const initialState = {
	data: [],
	loading: false,
	loadingError: false
};

 function milk (state = initialState, action) {
	switch (action.type) {
		case constant.GET_MILK_START:
			return { ...state, 
				loading: true 
			}
		case constant.GET_MILK_SUCCESS:

			return {
				...state,
				data: action.payload,
				loading: false,
				loadingError: false
			}
		case constant.GET_MILK_FAILURE:
			return { ...state, 
				loadingError: true, 
				loading: false 
			}

		case constant.ADD_MILK_START:
			return {
				...state,
				loadingError: false, 
				loading: true 
			}	

			case constant.ADD_MILK_SUCCESS:

			return {
				...state,
				data:action.payload,
				loadingError: false, 
				loading: false 
			}

			case constant.ADD_Milk_FAILURE:
			return {
				...state,
				data:action.payload,
				loadingError: true, 
				loading: false
			}
		default:
			return state
	}

}


export {milk}
