import constant from '../constant/Index';

export const getMilk = () => ({
  type: constant.GET_MILK_START,
});


export const addMilk = body => ({
  type: constant.ADD_MILK_START,
  payload: body,
});

export const filterMilkData = body => ({
  type: constant.FILTER_MILK_DATA_START,
  payload: body,
});

export const deleteMilk = body => ({
  type: constant.DELETE_MILK_START,
  payload: body,
});

export const editMilk = body => ({
  type: constant.EDIT_MILK_START,
  payload: body,
});

export const editMilkVisible = body => ({
  type: constant.EDIT_MILK_VISIBLE,
  payload: body,
});

export const selectAnimalTagVisible = body => ({
  type: constant.SELECT_ANIMAL_TAG_VISIBLE,
  payload: body,
});

export const getAnimalTags = () => ({
  type: constant.GET_ANIMAL_TAG_START,
});

export const selectAnimalTagItem = body => ({
  type: constant.SELECT_ANIMAL_TAG_ITEM,
  payload: body,
});

export const searchMilkAnimalTag = body => ({
  type: constant.SEARCH_ANIMAL_TAG,
  payload: body,
});


 // Animals //
 

export const addAnimal = body => ({
  type: constant.ADD_ANIMAL_START,
  payload: body,
});

export const deleteAnimal = body => ({
  type: constant.DELETE_ANIMAL_START,
  payload: body,
});

export const editAnimal = body => ({
  type: constant.EDIT_ANIMAL_START,
  payload: body,
});

export const getAnimal = body => ({
  type: constant.GET_ANIMAL_START,
  payload: body,
});

export const getAnimalMilk = body => ({
  type: constant.GET_ANIMAL_MILK_START,
  payload: body,
});


export const editAnimalVisible = body => ({
  type: constant.EDIT_ANIMAL_VISIBLE,
  payload: body,
});



export const selectedAnimal = body => ({
  type: constant.SELECTED_ANIMAL,
  payload: body,
});

// search

export const searchAnimal = body => ({
  type: constant.SEARCH_ANIMAL,
  payload: body,
});

/// Feed Item

// export const getFeedItem = () => ({
//   type: constant.GET_MILK_START,
// });


export const addFeedItem = body => ({
  type: constant.ADD_FEED_ITEM_START,
  payload: body,
});

export const editFeedItem = body => ({
  type: constant.EDIT_FEED_ITEM_START,
  payload: body,
});



export const editFeedItemVisible = body => ({
  type: constant.EDIT_FEED_ITEM_VISIBLE,
  payload: body,
});

export const deleteFeedItem = body => ({
  type: constant.DELETE_FEED_ITEM_START,
  payload: body,
});



export const selectFeedDateItem = body => ({
  type: constant.SELECT_FEED_DATE_ITEM,
  payload: body,
});

export const searchFeedDate = body => ({
  type: constant.SEARCH_FEED_DATE,
  payload: body,
});

export const getFeedItemDateData = body => ({
  type: constant.GET_FEED_ITEM_DATE_START,
  payload: body,
});


export const getFeedData = body => ({
  type: constant.GET_FEED_ITEM_START,
  payload: body,
});

export const addFeedItemDate = body => ({
  type: constant.ADD_FEED_ITEM_DATE_START,
  payload: body,
});





///

// export const filterFeedItemData = body => ({
//   type: constant.FILTER_MILK_DATA_START,
//   payload: body,
// });

// export const deleteFeedItem = body => ({
//   type: constant.DELETE_MILK_START,
//   payload: body,
// });

// export const editFeedItem = body => ({
//   type: constant.EDIT_MILK_START,
//   payload: body,
// });

// export const editMilkVisible = body => ({
//   type: constant.EDIT_MILK_VISIBLE,
//   payload: body,
// });

// export const selectAnimalTagVisible = body => ({
//   type: constant.SELECT_ANIMAL_TAG_VISIBLE,
//   payload: body,
// });

// export const getAnimalTags = () => ({
//   type: constant.GET_ANIMAL_TAG_START,
// });

// export const selectAnimalTagItem = body => ({
//   type: constant.SELECT_ANIMAL_TAG_ITEM,
//   payload: body,
// });


/// Feed Item DATE



export const getFeedItemDate = () => ({
  type: constant.GET_MILK_START,
});


// export const addFeedItemDate = body => ({
//   type: constant.ADD_MILK_START,
//   payload: body,
// });

export const filterFeedItemDateData = body => ({
  type: constant.FILTER_MILK_DATA_START,
  payload: body,
});

export const deleteFeedItemDate = body => ({
  type: constant.DELETE_MILK_START,
  payload: body,
});

export const editFeedItemDate = body => ({
  type: constant.EDIT_MILK_START,
  payload: body,
});

// export const editMilkVisible = body => ({
//   type: constant.EDIT_MILK_VISIBLE,
//   payload: body,
// });

// export const selectAnimalTagVisible = body => ({
//   type: constant.SELECT_ANIMAL_TAG_VISIBLE,
//   payload: body,
// });

// export const getAnimalTags = () => ({
//   type: constant.GET_ANIMAL_TAG_START,
// });

// export const selectAnimalTagItem = body => ({
//   type: constant.SELECT_ANIMAL_TAG_ITEM,
//   payload: body,
// });
