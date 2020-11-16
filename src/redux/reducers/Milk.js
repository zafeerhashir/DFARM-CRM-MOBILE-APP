import constant from '../constant/Index';
import {gainsboro} from 'color-name';

const initialState = {
  selectAnimalTagItem: {tag: '', id: ''},
  animalTagData: [],
  milkData: [],
  milkPerDayData: [],
  milkLoading: false,
  milkLoadingError: false,
  editMilkLoading: false,
  editMilkVisible: false,
  editMilkPerDayVisible: false,
  selectAnimalTagVisible: false,
  animalTagSearchResults:[],
  animalTagSearchTerm: ''
};

function milk(state = initialState, action) {
  switch (action.type) {
    case constant.GET_ANIMAL_TAG_START:
      return {...state, milkLoading: true};
    case constant.GET_ANIMAL_TAG_SUCCESS:
      console.log(action.payload, '.GET_ANIMAL_TAG_SUCCESS');
      return {
        ...state,
        animalTagData: action.payload,
        animalTagSearchResults: action.payload,
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

    case constant.ADD_Milk_FAILURE:
      return {
        ...state,
        milkLoadingError: true,
        milkLoading: false,
      };

    case constant.EDIT_MILK_VISIBLE:
      return {
        ...state,
        editMilkVisible: action.payload.visible,
      };

      case constant.EDIT_MILK_PER_DAY_VISIBLE:
      return {
        ...state,
        editMilkPerDayVisible: action.payload.visible,
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
        editMilkPerDayVisible: false,
      };

    case constant.EDIT_Milk_FAILURE:
      return {
        ...state,
        milkLoadingError: true,
        editMilkLoading: false,
        editMilkVisible: false,
        editMilkPerDayVisible: false,
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

      case constant.FILTER_MILK_PER_DAY_DATA_START:
        return {
          ...state,
          milkLoading: true,
          milkLoadingError: false,
        };
  
      case constant.FILTER_MILK_PER_DAY_DATA_SUCCESS:
        return {
          ...state,
          milkPerDayData: action.payload,
          milkLoadingError: false,
          milkLoading: false,
        };
  
      case constant.FILTER_MILK_PER_DAY_DATA_FAILURE:
        return {
          ...state,
          milkLoadingError: true,
          milkLoading: false,
          milkPerDayData: [],
        };  

    case constant.SEARCH_ANIMAL_TAG:
      if (
        action.payload.searchTerm.trim().length >= 1 &&
        state.animalTagSearchResults.length != 0
      ) {
        try {
          var suggestion = state.animalTagSearchResults
            .sort()
            .filter(x => {
              return new RegExp(action.payload.searchTerm, 'i').test(x.tag);
            });
        } catch (e) {
          // this.setState({searchFound: false});
        }

        return {
          ...state,
          animalTagSearchResults: suggestion,
          animalTagSearchTerm: action.payload.searchTerm,
        };

        // if (suggestion.length == 0) {
        //   setData(suggestion);
        // } else {
        //   setData(suggestion);
        // }
      } else {
        return {
          ...state,
          animalTagSearchResults: state.milkData,
          animalTagSearchTerm: action.payload.searchTerm,
        };
      }

    default:
      return state;
  }
}

export {milk};
