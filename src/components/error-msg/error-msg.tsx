import { useAppSelector } from '../hooks/reduxIndex';
import '../error-msg/error-msg-style.css'
import { getErrorMessage } from '../store/err-msg-process/selectors';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(getErrorMessage);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

}

export default ErrorMessage;