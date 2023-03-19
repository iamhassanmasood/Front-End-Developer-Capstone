import React, { createContext, useReducer, useContext } from 'react';
import { fetchAPI } from '../utils/apiMockup';
const initialState = {
  name: '',
  email: '',
  date: '',
  time: '',
  numberOfGuests: '',
  occasion: '',
  tablePreference: '',
  message: '',
};

function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'RESET_FORM':
      return initialState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const FormContext = createContext(null);

const FormProvider = ({ children }) => {
  const [form, dispatch] = useReducer(formReducer, initialState);

  function handleInputChange(event) {
    const { name, value } = event.target;
    dispatch({ type: 'UPDATE_FIELD', field: name, value });
  }

  function resetForm() {
    dispatch({ type: 'RESET_FORM' });
  }

  const timeSlots = React.useMemo(() => {
    if(form.date)
    return fetchAPI(new Date(form.date))
  }, [form.date]);

  const isFormValid = Object.values(form).every((value) => Boolean(value));

  const contextValue = {
    form,
    timeSlots,
    isFormValid,
    handleInputChange,
    resetForm,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

export { FormContext, FormProvider };

export const useForm = () => useContext(FormContext);
