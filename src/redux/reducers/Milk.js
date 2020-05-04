import constant from '../constant/Index';
import {gainsboro} from 'color-name';

const initialState = {
  selectAnimalTagItem: {tag:'',id:''},
  animalTagData: [],
  milkData: [],
  milkLoading: false,
  milkLoadingError: false,
  editMilkLoading: false,
  editMilkVisible: false,
  selectAnimalTagVisible: false,
};

function milk(state = initialState, action) {
  switch (action.type) {
    case constant.GET_ANIMAL_TAG_START:
      return {...state, milkLoading: true};
    case constant.GET_ANIMAL_TAG_SUCCESS:
      console.log(action.payload,'.GET_ANIMAL_TAG_SUCCESS')
      return {
        ...state,
        animalTagData: action.payload,
        milkLoading: false,
        milkLoadingError: false,
      };
    case constant.GET_ANIMAL_TAG_FAILURE:
      return {...state, milkLoadingError: true, milkLoading: false};

    case constant.GET_MILK_START:
      return {...state, milkLoadingError: false, milkLoading: true};
    case constant.GET_MILK_SUCCESS:
      console.log(action.payload, 'milkData');
      return {
        ...state,
        milkData: action.payload,
        milkLoading: false,
        milkLoadingError: false,
      };
    case constant.GET_MILK_FAILURE:
      return {
        ...state,
        milkLoadingError: true,
        milkLoading: false,
      };

    case constant.ADD_MILK_START:
      return {
        ...state,
        milkLoadingError: false,
        milkLoading: true,
      };

    case constant.ADD_MILK_SUCCESS:
      return {
        ...state,
        milkLoadingError: false,
        milkLoading: false,
      };

    case constant.EDIT_MILK_VISIBLE:
      return {
        ...state,
        editMilkVisible: action.payload.visible,
      };

    case constant.SELECT_ANIMAL_TAG_VISIBLE:
      return {
        ...state,
        selectAnimalTagVisible: action.payload.visible,
      };

    case constant.SELECT_ANIMAL_TAG_ITEM:
      return {
        ...state,
        selectAnimalTagVisible: false,
        selectAnimalTagItem: action.payload,
      };

    case constant.EDIT_MILK_START:
      return {
        ...state,
        milkLoadingError: false,
        editMilkLoading: true,
      };

    case constant.EDIT_MILK_SUCCESS:
      return {
        ...state,
        milkLoadingError: false,
        editMilkLoading: false,
        editMilkVisible: false,
      };

    case constant.EDIT_Milk_FAILURE:
      return {
        ...state,
        milkLoadingError: true,
        editMilkLoading: false,
        editMilkVisible: false,
      };

    case constant.ADD_Milk_FAILURE:
      return {
        ...state,
        milkLoadingError: true,
        milkLoading: false,
      };

    case constant.DELETE_MILK_START:
      return {
        ...state,
        milkLoadingError: false,
        milkLoading: true,
      };

    case constant.DELETE_MILK_SUCCESS:
      return {
        ...state,
        milkLoadingError: false,
        milkLoading: false,
      };

    case constant.DELETE_MILK_FAILURE:
      return {
        ...state,
        milkLoadingError: true,
        milkLoading: false,
      };

    case constant.FILTER_MILK_DATA_START:
      return {
        ...state,
        milkLoading: true,
        milkLoadingError: false,
      };

    case constant.FILTER_MILK_DATA_SUCCESS:
      return {
        ...state,
        milkData: action.payload,
        milkLoadingError: false,
        milkLoading: false,
      };

    case constant.FILTER_MILK_DATA_FAILURE:
      return {
        ...state,
        milkLoadingError: true,
        milkLoading: false,
        milkData: [],

      };

    default:
      return state;
  }
}

export {milk};
