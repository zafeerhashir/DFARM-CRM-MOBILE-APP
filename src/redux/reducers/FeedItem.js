import constant from '../constant/Index';

const initialState = {
  feedItemDate: {date: '', id: ''},
  selectFeedDateItem: {date: '', id: ''},
  feedItemDateData: [],
  feedItemDateSearchResults: [],
  feedItemSearchTerm: '',
  feedItemData: [],
  feedItemLoading: false,
  feedItemLoadingError: false,
  editFeedItemLoading: false,
  editFeedItemLoadingError: false,
  editFeedItemVisible: false,
  selectFeedDateVisible: false,
};

function feedItem(state = initialState, action) {
  switch (action.type) {
    case constant.GET_FEED_ITEM_START:
      return {...state, feedItemLoading: true, feedItemLoadingError: true};
    case constant.GET_FEED_ITEM_SUCCESS:
      return {
        ...state,
        feedItemData: action.payload,
        feedItemLoading: false,
        feedItemLoadingError: false,
      };
    case constant.GET_FEED_ITEM_FAILURE:
      return {...state, feedItemLoadingError: true, feedItemLoading: false};

    case constant.ADD_FEED_ITEM_DATE_START:
      return {
        ...state,
        feedItemLoading: true,
        feedItemLoadingError: true,
      };

    case constant.ADD_FEED_ITEM_DATE_SUCCESS:
      return {
        ...state,
        feedItemLoading: false,
        feedItemLoadingError: false,
        feedItemDate: action.payload,
      };

    case constant.ADD_FEED_ITEM_DATE_FAILURE:
      return {...state, feedItemLoading: false, feedItemLoadingError: true};

    case constant.ADD_FEED_ITEM_START:
      return {
        ...state,
        feedItemLoadingError: false,
        feedItemLoading: true,
      };

    case constant.ADD_FEED_ITEM_SUCCESS:
      return {
        ...state,
        feedItemLoadingError: false,
        feedItemLoading: false,
      };

    case constant.ADD_FEED_ITEM_FAILURE:
      return {
        ...state,
        feedItemLoadingError: true,
        feedItemLoading: false,
      };

    case constant.EDIT_FEED_ITEM_START:
      return {
        ...state,
        editFeedItemLoadingError: false,
        editFeedItemLoading: true,
      };

    case constant.EDIT_FEED_ITEM_SUCCESS:
      return {
        ...state,
        editFeedItemLoadingError: false,
        editFeedItemLoading: false,
        editFeedItemVisible: false,
      };

    case constant.EDIT_FEED_ITEM_FAILURE:
      return {
        ...state,
        editFeedItemLoadingError: true,
        editFeedItemLoading: false,
        editFeedItemVisible: false,
      };

    case constant.EDIT_FEED_ITEM_VISIBLE:
      return {
        ...state,
        editFeedItemVisible: action.payload.visible,
      };

    case constant.DELETE_FEED_ITEM_START:
      return {
        ...state,
        milkLoadingError: false,
        milkLoading: true,
      };

    case constant.DELETE_FEED_ITEM_SUCCESS:
      return {
        ...state,
        milkLoadingError: false,
        milkLoading: false,
      };

    case constant.DELETE_FEED_ITEM_FAILURE:
      return {
        ...state,
        milkLoadingError: true,
        milkLoading: false,
      };

    default:
      return state;
  }
}

export {feedItem};
