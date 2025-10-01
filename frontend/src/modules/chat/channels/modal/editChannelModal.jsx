import Modal from 'react-bootstrap/Modal';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ChannelsValidationSchema } from '../../../../validationShemas';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect } from 'react';

export const EditChannelModal = ({
  isOpen,
  onClose,
  onSubmit,
  channelName,
  channelsNames,
  textHeaderModal,
}) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

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
    <Modal show={isOpen} onHide={onClose} centered>
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
              <Form.Group className="mb-3">
                <Field name="chatName">
                  {({ field }) => (
                    <Form.Control
                      {...field}
                      ref={inputRef}
                      type="text"
                      isInvalid={errors.chatName && touched.chatName}
                    />
                  )}
                </Field>

                <Form.Control.Feedback type="invalid">
                  <ErrorMessage name="chatName" />
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                  disabled={isSubmitting}
                >
                  {t('channels.modal.cancel')}
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {t('channels.modal.submit')}
                </Button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
