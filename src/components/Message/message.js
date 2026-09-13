import { useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import useMessage from "../../core/message";

const Message = () => {
    const errors = useSelector((s) => s.converter.errors)
    const { removeMessage } = useMessage();

    const handleCloseErrors = useCallback((id) => {
        removeMessage(id);
    }, [removeMessage]);

    const errorBlock = useMemo(() => {
        if (errors.length > 0) {
            return errors.map((e, i) => (<div
                    key={i} id={i}
                    className={`translate-middle z-3 border p-3 shadow rounded alert ${e.type}`}
                    onClick={() => handleCloseErrors(i)}
                >
                    <div onClick={() => handleCloseErrors(i)}>
                        {typeof e === 'string' ? e : e.text}
                    </div>
                </div>
            ))
        } else {
            return null;
        }
    }, [errors, handleCloseErrors]);

    return <div className='error-block position-absolute start-50'>{ errorBlock }</div>
}

export default Message;