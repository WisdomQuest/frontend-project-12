import { Formik } from 'formik'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const AuthForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  submitButtonText,
  isLoading,
  title,
  registerRef,
  createKeyDownHandler,
  children,
  isInvalidField = false,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <>
          <Form
            noValidate
            onSubmit={handleSubmit}
            className="w-100 position-relative"
          >
            <h1 className="text-center mb-4">{title}</h1>

            {fields.map(
              ({ name, type, label, placeholder, autoComplete }, idx) => (
                <Row className="mb-3" key={name}>
                  <Form.Group
                    as={Col}
                    controlId={`validationFormik${name}`}
                    className="position-relative"
                  >
                    <FloatingLabel controlId={`floating${name}`} label={label}>
                      <Form.Control
                        type={type}
                        name={name}
                        value={values[name]}
                        onChange={handleChange}
                        ref={registerRef ? registerRef(name) : null}
                        placeholder={placeholder}
                        onKeyDown={
                          createKeyDownHandler
                            ? createKeyDownHandler(name, handleSubmit)
                            : undefined
                        }
                        isInvalid={
                          (touched[name] && !!errors[name]) || isInvalidField
                        }
                        autoFocus={idx === 0}
                        autoComplete={autoComplete || name}
                      />
                      {errors[name] && (
                        <Form.Control.Feedback type="invalid" tooltip>
                          {errors[name]}
                        </Form.Control.Feedback>
                      )}
                    </FloatingLabel>
                  </Form.Group>
                </Row>
              ),
            )}

            <Button
              variant="outline-primary"
              className="w-100"
              type="submit"
              disabled={isLoading}
            >
              {submitButtonText}
            </Button>
          </Form>
          {children}
        </>
      )}
    </Formik>
  )
}
