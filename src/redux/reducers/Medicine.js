import constant from '../constant/Index';
import {gainsboro} from 'color-name';

const initialState = {
  selectAnimalTagItem: {tag: '', id: ''},
  animalTagData: [],
  medicineData: [],
  medicineLoading: false,
  medicineLoadingError: false,
  editMedicineLoading: false,
  editMedicineVisible: false,
  selectAnimalTagVisible: false,
  animalTagSearchResults:[],
  animalTagSearchTerm: ''
};

function medicine(state = initialState, action) {
  switch (action.type) {
      // ANIMAL TAG
    case constant.GET_ANIMAL_TAG_START:
      return {...state, medicineLoading: true};
    case constant.GET_ANIMAL_TAG_SUCCESS:
      console.log(action.payload, '.GET_ANIMAL_TAG_SUCCESS');
      return {
        ...state,
        animalTagData: action.payload,
        animalTagSearchResults: action.payload,
        medicineLoading: false,
        medicineLoadingError: false,
      };
    case constant.GET_ANIMAL_TAG_FAILURE:
      return {...state, medicineLoadingError: true, medicineLoading: false};


    case constant.GET_MEDICINE_START:
      return {...state, medicineLoadingError: false, medicineLoading: true};
    case constant.GET_MEDICINE_SUCCESS:
      console.log(action.payload, 'medicineData');
      return {
        ...state,
        medicineData: action.payload,
        medicineLoading: false,
        medicineLoadingError: false,
      };
    case constant.GET_MEDICINE_FAILURE:
      return {
        ...state,
        medicineLoadingError: true,
        medicineLoading: false,
      };

    case constant.ADD_MEDICINE_START:
      return {
        ...state,
        medicineLoadingError: false,
        medicineLoading: true,
      };

    case constant.ADD_MEDICINE_SUCCESS:
      return {
        ...state,
        medicineLoadingError: false,
        medicineLoading: false,
      };

    case constant.ADD_MEDICINE_FAILURE:
      return {
        ...state,
        medicineLoadingError: true,
        medicineLoading: false,
      };

    case constant.EDIT_MEDICINE_VISIBLE:
      return {
        ...state,
        editMedicineVisible: action.payload.visible,
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

    case constant.EDIT_MEDICINE_START:
      return {
        ...state,
        medicineLoadingError: false,
        editMedicineLoading: true,
      };

    case constant.EDIT_MEDICINE_SUCCESS:
      return {
        ...state,
        medicineLoadingError: false,
        editMedicineLoading: false,
        editMedicineVisible: false,
      };

    case constant.EDIT_MEDICINE_FAILURE:
      return {
        ...state,
        medicineLoadingError: true,
        editMedicineLoading: false,
        editMedicineVisible: false,
      };

    case constant.DELETE_MEDICINE_START:
      return {
        ...state,
        medicineLoadingError: false,
        medicineLoading: true,
      };

    case constant.DELETE_MEDICINE_SUCCESS:
      return {
        ...state,
        medicineLoadingError: false,
        medicineLoading: false,
      };

    case constant.DELETE_MEDICINE_FAILURE:
      return {
        ...state,
        medicineLoadingError: true,
        medicineLoading: false,
      };

    case constant.FILTER_MEDICINE_DATA_START:
      return {
        ...state,
        medicineLoading: true,
        medicineLoadingError: false,
      };

    case constant.FILTER_MEDICINE_DATA_SUCCESS:
      return {
        ...state,
        medicineData: action.payload,
        medicineLoadingError: false,
        medicineLoading: false,
      };

    case constant.FILTER_MEDICINE_DATA_FAILURE:
      return {
        ...state,
        medicineLoadingError: true,
        medicineLoading: false,
        medicineData: [],
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
          animalTagSearchResults: state.medicineData,
          animalTagSearchTerm: action.payload.searchTerm,
        };
      }

    default:
      return state;
  }
}

export {medicine};
