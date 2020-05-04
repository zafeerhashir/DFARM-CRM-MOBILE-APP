

export const literRegex = '^\\d+(\\.\\d{1,2})?$'

export const descriptionRegex = '^\s*([0-9a-zA-Z ]*)\s*$'


   export const validationHandler= async (value, type)=>
   {
   

    if(await requireFieldValidator(value))
    {

       if(type == 'FLOAT')
       {
           return  validateFloat(value)
       }

       else if (type == 'TEXT')
       {
           return await validateText(value)
       }

       else if (type == 'AlPHABET')
       {
           return await alphabets(value)
       }
       
    }
    else
    {
        return false
    }

   }

   export const validateText = async (value)=>
   {
     text = /^\s*([0-9a-zA-Z ]*)\s*$/

     if(text.test(value))
     {

       return await true
     }
     else
     {
       return await false;
     }
     
   }

   export const alphabets = async (value)=>
   {
     text = /^\s*([a-zA-Z ]*)\s*$/

     if(text.test(value))
     {

       return await true
     }
     else
     {
       return await false;
     }
     
   }


 export const validateFloat = async (int)=>
   {
     integer = /^((\d|[1-9]\d+)(\.\d{1})?|\.\d{1})$/

     if(integer.test(int))
     {
       return await true
     }
     else
     {
       return await false;
     }
     
   }

   export const rangeValidator = async (int, range)=>
   {

     if(parseFloat(int, 3)<=parseFloat(range, 3))
     {
       return await true
     }
     else
     {
       return await false;
     }
     
   }

   export const requireFieldValidator = async (value)=>
   {

       if(value == null || value == undefined || value == '' )   
       {
           return await false;
       }
       else
       {
           return await true;
       }
   }

