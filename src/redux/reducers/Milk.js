import constant from '../constant/Index'

const initialState = {
	milkData: [],
	milkLoading: false,
	milkLoadingError: false
};

 function milk (state = initialState, action) {
	switch (action.type) {
		case constant.GET_MILK_START:
			return { ...state, 
				milkLoading: true 
			}
		case constant.GET_MILK_SUCCESS:

			return {
				...state,
				milkData: action.payload,
				milkLoading: false,
				milkLoadingError: false
			}
		case constant.GET_MILK_FAILURE:
			return { ...state, 
				milkLoadingError: true, 
				milkLoading: false 
			}

		case constant.ADD_MILK_START:
			return {
				...state,
				milkLoadingError: false, 
				milkLoading: true 
			}	

			case constant.ADD_MILK_SUCCESS:

			return {
				...state,
				milkData:action.payload,
				milkLoadingError: false, 
				milkLoading: false 
			}

			case constant.ADD_Milk_FAILURE:
			return {
				...state,
				milkData:action.payload,
				milkLoadingError: true, 
				milkLoading: false
			}

		
		default:
			return state
	}

}


export {milk}
