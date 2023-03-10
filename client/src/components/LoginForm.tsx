import { Formik } from 'formik';
import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginFormSchema } from '../schemas/loginForm';
import { postLogin } from '../services/authRequests';

export default function LoginForm() {
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  return (
    <>
      <div className='error-div'>{errorMsg && <h2>{errorMsg}</h2>}</div>
      <Formik
        validationSchema={loginFormSchema}
        onSubmit={async (values, actions) => {
          try {
            const { data } = await postLogin(values);
            localStorage.setItem('accessToken', JSON.stringify(data.token));
            navigate('/customer/products');
          } catch (error: any) {
            setErrorMsg(error.response.data.message);
          } finally {
            actions.setSubmitting(false);
            actions.resetForm();
            setTimeout(() => {
              setErrorMsg(null);
            }, 3000);
          }
        }}
        initialValues={{
          email: '',
          password: '',
        }}
      >
        {({ values, handleSubmit, handleChange, touched, errors }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className='d-flex flex-column mb-4'
          >
            <Form.Group className='mb-3' controlId='formEmail'>
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  type='email'
                  placeholder='Insira seu email'
                  value={values.email}
                  onChange={handleChange}
                  name='email'
                  isValid={touched.email && !errors.email}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback tooltip>
                  Looks good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type='invalid' tooltip>
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formPassword'>
              <Form.Label>Senha</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  type='password'
                  placeholder='Password'
                  value={values.password}
                  onChange={handleChange}
                  name='password'
                  isValid={touched.password && !errors.password}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback tooltip>
                  Looks good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type='invalid' tooltip>
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Button type='submit'>Enviar</Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
