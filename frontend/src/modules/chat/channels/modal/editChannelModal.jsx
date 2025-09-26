import Modal from 'react-bootstrap/Modal';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { ChannelsValidationSchema } from '../../../../validationShemas';
import { useTranslation } from 'react-i18next';

export const EditChannelModal = ({
  isOpen,
  onClose,
  onSubmit,
  channelName,
  channelsNames,
  textHeaderModal,
}) => {
  const { t } = useTranslation();
  
  if (!isOpen) return null;

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await onSubmit(values);
      resetForm();
      onClose();
    } catch (error) {
      console.error(t('auth.errors.connectionError'), error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{textHeaderModal}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ chatName: channelName ?? '' }}
          onSubmit={handleSubmit}
          validationSchema={ChannelsValidationSchema(channelsNames)}
          validateOnBlur={false}
          validateOnMount={false}
          validateOnChange={false}
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
                  {t('channels.modal.cancel')}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {t('channels.modal.submit')}
                </button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
