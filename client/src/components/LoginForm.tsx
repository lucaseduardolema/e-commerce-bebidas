import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { loginFormSchema } from '../schemas/loginForm';
import { postLogin } from '../services/auth.service';

export default function LoginForm() {
  return (
    <>
      <Formik
        validationSchema={loginFormSchema}
        onSubmit={async (values, actions) => {
          await postLogin(values)
          actions.setSubmitting(false);
        }}
        initialValues={{
          email: '',
          password: '',
        }}
      >
        {({ values, handleSubmit, handleChange, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Insira seu email'
                value={values.email}
                onChange={handleChange}
                name='email'
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid" tooltip>
                  {errors.email}
                </Form.Control.Feedback>
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={values.password}
                onChange={handleChange}
                name='password'
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid" tooltip>
                  {errors.password}
                </Form.Control.Feedback>
            </Form.Group>

            <Button type='submit'>Enviar</Button>

          </Form>
        )}
      </Formik>
    </>
  );
}
