import constant from '../constant/Index';

export const getMilk = () => ({
  type: constant.GET_MILK_START,
});

export const getAnimal = () => ({
  type: constant.GET_ANIMAL_START,
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
