import { Formik } from 'formik';
import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { registerFormSchema } from '../schemas/registerForm';
import { postRegister } from '../services/auth.service';

export default function RegisterForm() {
  const [errorMsg, setErrorMsg] = useState(null)
  const navigate = useNavigate();
  return (
    <>
      <div className='error-div'>{errorMsg && <h2>{errorMsg}</h2>}</div>
      <Formik
        onSubmit={async (values, actions) => {
          try {
            const { data } = await postRegister(values);
            localStorage.setItem('accessToken', JSON.stringify(data.token));
            navigate('/customer/products')
          } catch (error: any) {
            setErrorMsg(error.response.data.message);
          } finally {
            actions.setSubmitting(false);
            actions.resetForm();
            setTimeout(() => {
              setErrorMsg(null)
            }, 3000)
          }
        }}
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={registerFormSchema}
        validateOnChange={true}
      >
        {({values, handleChange, handleSubmit, touched, errors}) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className='d-flex flex-column'
          >
            <Form.Group className='mb-3' controlId='formName'>
              <Form.Label>Nome</Form.Label>
              <InputGroup>
                <Form.Control
                  required
                  type='text'
                  placeholder='Insira nome e sobrenome'
                  value={values.name}
                  onChange={handleChange}
                  name='name'
                  isValid={touched.name && !errors.name}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback tooltip>
                  Looks good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type='invalid' tooltip>
                  {errors.name}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

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

            <Button size="lg" type='submit'>Cadastrar</Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
