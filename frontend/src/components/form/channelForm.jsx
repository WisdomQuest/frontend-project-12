import { useRef, useEffect } from 'react'
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createChannelsValidation } from '../../validationShemas.js'
import { notifyError } from '../../common/notify/notify.js'

export const ChannelForm = ({
  initialName = '',
  onSubmit,
  channelsNames = [],
  t,
  textError,
  onClose,
}) => {
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await onSubmit(values)
      resetForm()
      onClose()
    }
    catch (error) {
      console.error(t('auth.errors.connectionError'), error)
      notifyError(t(textError))
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{ chatName: initialName }}
      onSubmit={handleSubmit}
      validationSchema={createChannelsValidation(t, channelsNames)}
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
                  id="chatNameInput"
                  isInvalid={!!errors.chatName && !!touched.chatName}
                />
              )}
            </Field>

            <label htmlFor="chatNameInput" className="visually-hidden">
              {t('channels.modal.nameChannel')}
            </label>

            <Form.Control.Feedback type="invalid">
              <ErrorMessage name="chatName" />
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                resetForm()
                onClose?.()
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
  )
}
