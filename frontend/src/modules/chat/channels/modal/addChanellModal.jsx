import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddChanellModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const initialValues = {
    chatName: '',
  };

  const validationSchema = Yup.object({
    chatName: Yup.string()
      .required('Обязательное поле')
      .min(3, 'от 3 до 20 символов')
      .max(20, 'от 3 до 20 символов'),
  });



  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await onSubmit(values);
      resetForm();
      onClose();
    } catch (error) {
      console.error('Ошибка создания чата:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Добавтить канал</h1>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched, resetForm }) => (
              <Form>
                <div className="modal-body">
                  <div className="mb-3">
                    <Field
                      type="text"
                      id="chatName"
                      name="chatName"
                      autoFocus={true}
                      className={`form-control ${
                        errors.chatName && touched.chatName ? 'is-invalid' : ''
                      }`}
                    />

                    <ErrorMessage
                      name="chatName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      resetForm();
                      onClose();
                    }}
                    disabled={isSubmitting}
                  >
                    Отменить
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    Отправить
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddChanellModal;
