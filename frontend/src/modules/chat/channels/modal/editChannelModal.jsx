import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { ChannelsValidationSchema } from '../../../../validation-shemas';

export const EditChannelModal = ({
  isOpen,
  onClose,
  onSubmit,
  channelName,
  channelsName,
}) => {
  if (!isOpen) return null;

  const handleSubmit = async (values) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Ошибка переименовании канала:', error);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ chatName: channelName }}
          onSubmit={handleSubmit}
          validationSchema={ChannelsValidationSchema(channelsName)}
        >
          {({ isSubmitting, errors, touched, resetForm }) => (
            <FormikForm>
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
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
