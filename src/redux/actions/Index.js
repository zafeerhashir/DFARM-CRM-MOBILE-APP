

import constant from '../constant/Index'

export const getMilk = () => ({
       type: constant.GET_MILK_START
});

export const getAnimal = () => ({
    type: constant.GET_ANIMAL_START
});


export const addMilk = (body) => ({
       type: constant.ADD_MILK_START,
       payload: body
});


export const filterMilkData = (body) => ({
    type: constant.FILTER_MILK_DATA_START,
    payload: body
});

export const deleteMilk = (body) => ({
    type: constant.DELETE_MILK_START,
    payload: body
});
