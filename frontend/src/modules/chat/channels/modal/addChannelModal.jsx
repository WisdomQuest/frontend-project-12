import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ChannelsValidationSchema } from '../../../../validation-shemas';

const AddChanellModal = ({ isOpen, onClose, onSubmit, channelsName }) => {
  if (!isOpen) return null;

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await onSubmit(values);
      resetForm();
      onClose();
    } catch (error) {
      console.error('Ошибка создания канала:', error);
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
            initialValues={{
              chatName: '',
            }}
            validationSchema={() => ChannelsValidationSchema(channelsName)}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched, resetForm }) => (
              <Form>
                <div className="modal-body">
                  <div className="mb-3">
                    <Field
                      type="text"
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
