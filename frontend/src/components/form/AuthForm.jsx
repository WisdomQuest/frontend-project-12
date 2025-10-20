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
  title,
  isLoading,
  t,
  registerFieldRef,
  handleKeyDown,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className="w-50 position-relative">
          <h1 className="text-center mb-4">{title}</h1>
          {fields.map(({ name, type, label, placeholder }, idx) => (
            <Row className="mb-3" key={name}>
              <Form.Group as={Col} controlId={`validationFormik${name}`} className="position-relative">
                <FloatingLabel controlId={`floating${name}`} label={label}>
                  <Form.Control
                    type={type}
                    name={name}
                    value={values[name]}
                    onChange={handleChange}
                    ref={registerFieldRef ? registerFieldRef(name) : null}
                    placeholder={placeholder}
                    onKeyDown={e => handleKeyDown && handleKeyDown(e, name)}
                    isInvalid={touched[name] && !!errors[name]}
                    autoFocus={idx === 0}
                    autoComplete={type === 'password' ? 'current-password' : 'username'}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors[name]}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>
          ))}

          <Button variant="outline-primary" className="w-100" type="submit" disabled={isLoading}>
            {title}
          </Button>
        </Form>
      )}
    </Formik>
  )
}
