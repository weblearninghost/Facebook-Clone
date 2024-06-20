import './style.css';
import { useField, ErrorMessage } from 'formik';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function LoginInput({ placeholder, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="input_wrap">
      <div
        className={meta.error && meta.touched ? 'error_icon_wrap' : 'invisible'}
      >
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          color="red"
        ></FontAwesomeIcon>
      </div>

      <input
        className={meta.error && meta.touched && 'input_error_border'}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      <div className="input_error_message">
        {meta.error && meta.touched && <ErrorMessage name={field.name} />}
      </div>
    </div>
  );
}
