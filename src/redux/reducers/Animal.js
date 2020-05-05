import constant from '../constant/Index';

const initialState = {
  animalData: [],
  animalLoading: false,
  animalLoadingError: false,
  animalMilkData: [],
  animalMilkLoading: false,
  animalMilkLoadingError: false,
  editAnimalLoading: false,
  editAnimalVisible: false,
};

function animal(state = initialState, action) {
  switch (action.type) {
    case constant.GET_ANIMAL_START:
      return {...state, animalLoading: true};
    case constant.GET_ANIMAL_SUCCESS:
      return {
        ...state,
        animalData: action.payload,
        animalLoading: false,
        animalLoadingError: false,
      };
    case constant.GET_ANIMAL_FAILURE:
      return {...state, animalLoadingError: true, animalLoading: false};

    case constant.ADD_ANIMAL_START:
      return {
        ...state,
        animalLoadingError: false,
        animalLoading: true,
      };

    case constant.GET_ANIMAL_MILK_START:
      return {...state, animalMilkLoading: true};
    case constant.GET_ANIMAL_MILK_START:
      return {
        ...state,
        animalMilkData: action.payload,
        animalMilkLoading: false,
        animalMilkLoadingError: false,
      };
    case constant.GET_ANIMAL_MILK_FAILURE:
      return {...state, animalMilkLoadingError: true, animalMilkLoading: false};

    case constant.ADD_ANIMAL_START:
      return {
        ...state,
        animalLoadingError: false,
        animalLoading: true,
      };

    case constant.ADD_ANIMAL_SUCCESS:
      return {
        ...state,
        animalLoadingError: false,
        animalLoading: false,
      };

    case constant.ADD_ANIMAL_FAILURE:
      return {
        ...state,
        animalLoadingError: true,
        animalLoading: false,
      };

    case constant.EDIT_ANIMAL_START:
      return {
        ...state,
        animalLoadingError: false,
        editAnimalLoading: true,
      };

    case constant.EDIT_ANIMAL_SUCCESS:
      return {
        ...state,
        animalLoadingError: false,
        editAnimalLoading: false,
        editAnimalVisible: false,
      };

    case constant.EDIT_ANIMAL_FAILURE:
      return {
        ...state,
        animalLoadingError: true,
        editAnimalLoading: false,
        editAnimalVisible: false,
      };

    case constant.DELETE_ANIMAL_START:
      return {
        ...state,
        animalLoadingError: false,
        animalLoading: true,
      };

    case constant.DELETE_ANIMAL_SUCCESS:
      return {
        ...state,
        animalLoadingError: false,
        animalLoading: false,
      };

    case constant.DELETE_ANIMAL_FAILURE:
      return {
        ...state,
        animalLoadingError: true,
        animalLoading: false,
      };

    case constant.EDIT_ANIMAL_VISIBLE:
      return {
        ...state,
        editAnimalVisible: action.payload.visible,
      };

    default:
      return state;
  }
}

export {animal};
