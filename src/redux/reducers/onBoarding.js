import constant from '../constant/Index';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  onBoardingLoading: false,
  onBoardingLoadingError: false,
  userToken: null,
  user: {},
  splashLoading: false

};

function onBoarding(state = initialState, action) {
  switch (action.type) {
    case constant.LOGIN_START:
      return {...state, onBoardingLoading: true};
    case constant.LOGIN_SUCCESS:
      // AsyncStorage.setItem('userToken', action.payload.token)

  

      return {
        ...state,
        onBoardingLoading: false,
        onBoardingLoadingError: false,
        userToken: action.payload.token,
        user: action.payload,
      };
    case constant.LOGIN_FAILURE:
      return {...state, onBoardingLoadingError: true, onBoardingLoading: false};

    case constant.LOGOUT_START:
      // AsyncStorage.clear()
      return {...state, onBoardingLoadingError: false, onBoardingLoading: true };

    case constant.LOGOUT_SUCCESS:
      // AsyncStorage.clear()
      return {
        ...state,
        onBoardingLoadingError: false,
        onBoardingLoading: false,
        userToken: null,
      };

    case constant.RESTORE_TOKEN_SUCCESS:
      return {
        ...state,
        userToken: action.payload.token,
        user: action.payload,
        onBoardingLoadingError: false,
        splashLoading: false
      };

    case constant.RESTORE_TOKEN_START:
      return {
        ...state,
        onBoardingLoadingError: false,
        onBoardingLoading: false,
        splashLoading: true
      };

      case constant.RESTORE_TOKEN_FAILURE:
        return {
          ...state,
        userToken: null,
        user: null,
        onBoardingLoadingError: true,
        splashLoading: false
        };
      
      

    default:
      return state;
  }
}

export {onBoarding};
