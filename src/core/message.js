import { addErrors, removeError, setErrors, removeFirstError } from '../store/converterSlice';
import { useDispatch} from 'react-redux'

const useMessage = () => {
    const dispatch = useDispatch();

    const addErrorMessage = (message) => {
        dispatch(addErrors({
            'type': 'alert-danger',
            'text': message
        }))

        setTimeout(() => {
            dispatch(removeFirstError());
        }, 3000);
    }

    const addSuccessMessage = (message) => {
        dispatch(addErrors({
            'type': 'alert-success',
            'text': message
        }))

        setTimeout(() => {
            dispatch(removeFirstError());
        }, 1000);
    }

    const removeMessage = (id) => {
        dispatch(removeError(id));
    }

    const clearMessage = () => {
        dispatch(setErrors([]));
    }

    return {
        addErrorMessage,
        addSuccessMessage,
        removeMessage,
        clearMessage
    }
}

export default useMessage;