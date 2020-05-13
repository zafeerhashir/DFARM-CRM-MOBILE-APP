import constant from '../constant/Index';

const initialState = {
  onBoardingLoading: false,
  onBoardingLoadingError: false,
};

function onBoarding(state = initialState, action) {
  switch (action.type) {
    case constant.LOGIN_START:
      return {...state, onBoardingLoading: true};
    case constant.LOGIN_SUCCESS:
      return {
        ...state,
        onBoardingLoading: false,
        onBoardingLoadingError: false,
      };
    case constant.LOGIN_FAILURE:
      return {...state, onBoardingLoadingError: true, onBoardingLoading: false};

    default:
      return state;
  }
}

export {onBoarding};
