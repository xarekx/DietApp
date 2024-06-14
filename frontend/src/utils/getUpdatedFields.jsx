export const getUpdatedFields = (form, selectedProduct) => {
    const updatedFields = {}

     Object.keys(form).forEach((key) => {
         if (form[key] !== selectedProduct[key]) {
             updatedFields[key] = form[key];
         }
     });

     return updatedFields;
 }