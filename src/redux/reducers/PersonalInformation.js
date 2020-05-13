import constant from '../constant/Index';

const initialState = {
  personalInformationLoading: false,
  personalInformationLoadingError: false,
};

function personalInformation(state = initialState, action) {
  switch (action.type) {
    case constant.CHANGE_PASSWORD_START:
      return {...state, personalInformationLoading: true};
    case constant.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        personalInformationLoading: false,
        personalInformationLoadingError: false,
      };
    case constant.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        personalInformationLoadingError: true,
        personalInformationLoading: false,
      };

    default:
      return state;
  }
}

export {personalInformation};
