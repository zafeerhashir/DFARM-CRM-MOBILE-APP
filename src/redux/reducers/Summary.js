import constant from '../constant/Index';
import {gainsboro} from 'color-name';

const initialState = {
  animalTagData: [],
  summaryData: [],
  summaryLoading: false,
  summaryLoadingError: false,

};

function summary(state = initialState, action) {
  switch (action.type) {

    case constant.GET_SUMMARY_START:
      return {...state, summaryLoadingError: false, summaryLoading: true};
    case constant.GET_SUMMARY_SUCCESS:
      console.log(action.payload, 'summaryData');
      return {
        ...state,
        summaryData: action.payload,
        summaryLoading: false,
        summaryLoadingError: false,
      };
    case constant.GET_SUMMARY_FAILURE:
      return {
        ...state,
        summaryLoadingError: true,
        summaryLoading: false,
      };

 
    default:
      return state;
  }
}

export {summary};
