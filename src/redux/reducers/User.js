import constant from '../constant/Index';

const initialState = {
  userData: [],
  userLoading: false,
  userLoadingError: false,
  changeUserPasswordLoading: false,
  changeUserPasswordVisible: false,
  selectedUser:  {username: '', userId: ''},
  userSearchTerm: '',
  userSearchResults: [],
};

function user(state = initialState, action) {
  switch (action.type) {
    case constant.GET_USER_START:
      return {...state, userLoading: true};
    case constant.GET_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        userSearchResults: action.payload,
        userLoading: false,
        userLoadingError: false,
      };
    case constant.GET_USER_FAILURE:
      return {...state, userLoadingError: true, userLoading: false};

    case constant.ADD_USER_START:
      return {
        ...state,
        userLoadingError: false,
        userLoading: true,
      };

    case constant.ADD_USER_SUCCESS:
      return {
        ...state,
        userLoadingError: false,
        userLoading: false,
      };

    case constant.ADD_USER_FAILURE:
      return {
        ...state,
        userLoadingError: true,
        userLoading: false,
      };

    case constant.EDIT_USER_PASSWORD_START:
      return {
        ...state,
        userLoadingError: false,
        changeUserPasswordLoading: true,
      };

    case constant.EDIT_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        userLoadingError: false,
        changeUserPasswordLoading: false,
        changeUserPasswordVisible: false,
      };

    case constant.EDIT_USER_PASSWORD_FAILURE:
      return {
        ...state,
        userLoadingError: true,
        changeUserPasswordLoading: false,
        changeUserPasswordVisible: false,
      };

    case constant.DELETE_USER_START:
      return {
        ...state,
        userLoadingError: false,
        userLoading: true,
      };

    case constant.DELETE_USER_SUCCESS:
      return {
        ...state,
        userLoadingError: false,
        userLoading: false,
      };

    case constant.DELETE_USER_FAILURE:
      return {
        ...state,
        userLoadingError: true,
        userLoading: false,
      };

    case constant.EDIT_USER_PASSWORD_VISIBLE:
      return {
        ...state,
        changeUserPasswordVisible: action.payload.visible,
      };

    case constant.SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload.selectedUser,
      };

    case constant.SEARCH_USER:
      if (
        action.payload.searchTerm.trim().length >= 1 &&
        state.userSearchResults.length != 0
      ) {
        try {
          var suggestion = state.userSearchResults.sort().filter(x => {
            return new RegExp(action.payload.searchTerm, 'i').test(x.userName);
          });
        } catch (e) {
          // this.setState({searchFound: false});
        }

        return {
          ...state,
          userSearchResults: suggestion,
          userSearchTerm: action.payload.searchTerm,
        };

        // if (suggestion.length == 0) {
        //   setData(suggestion);
        // } else {
        //   setData(suggestion);
        // }
      } else {
        return {
          ...state,
          userSearchResults: state.userData,
          userSearchTerm: action.payload.searchTerm,
        };
      }

    default:
      return state;
  }
}

export {user};
