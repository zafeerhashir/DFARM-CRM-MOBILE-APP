import constant from '../constant/Index'

const initialState = {
	animalData: [],
	animalLoading: false,
	animalLoadingError: false
};

 function animal (state = initialState, action) {
	switch (action.type) {
		case constant.GET_ANIMAL_START:
			return { ...state, 
				animalLoading: true 
			}
		case constant.GET_ANIMAL_SUCCESS:

			return {
				...state,
				animalData: action.payload,
				animalLoading: false,
				animalLoadingError: false
			}
		case constant.GET_ANIMAL_FAILURE:
			return { ...state, 
				animalLoadingError: true, 
				animalLoading: false 
			}

		case constant.ADD_ANIMAL_START:
			return {
				...state,
				animalLoadingError: false, 
				animalLoading: true 
			}	

			case constant.ADD_ANIMAL_SUCCESS:

			return {
				...state,
				animalLoadingError: false, 
				animalLoading: false 
			}

			case constant.ADD_ANIMAL_FAILURE:
			return {
				...state,
				animalLoadingError: true, 
				animalLoading: false
			}
		default:
			return state
	}

}


export {animal}
