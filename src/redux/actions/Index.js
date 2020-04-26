

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


