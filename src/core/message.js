import { addErrors, removeError, setErrors, removeFirstError } from '../store/converterSlice';
import { useDispatch} from 'react-redux'
import { useCallback } from 'react'

const useMessage = () => {
    const dispatch = useDispatch();

    const addErrorMessage = useCallback((message) => {
        dispatch(addErrors({
            'type': 'alert-danger',
            'text': message
        }))

        setTimeout(() => {
            dispatch(removeFirstError());
        }, 3000);
    }, [dispatch])

    const addSuccessMessage = useCallback((message) => {
        dispatch(addErrors({
            'type': 'alert-success',
            'text': message
        }))

        setTimeout(() => {
            dispatch(removeFirstError());
        }, 1000);
    }, [dispatch])

    const removeMessage = useCallback((id) => {
        dispatch(removeError(id));
    }, [dispatch])

    const clearMessage = useCallback(() => {
        dispatch(setErrors([]));
    }, [dispatch])

    return {
        addErrorMessage,
        addSuccessMessage,
        removeMessage,
        clearMessage
    }
}

export default useMessage;
