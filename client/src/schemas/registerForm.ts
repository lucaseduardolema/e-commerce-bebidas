import * as yup from "yup";

export const registerFormSchema = yup.object().shape({
  name: yup.string()
    .min(6, 'Insira nome e sobrenome')
    .required('Por favor insira nome e sobrenome'),
  email: yup.string()
    .email('Insira um email válido')
    .required('Por favor insira seu email'),
  password: yup.string()
    .min(8, 'Sua senha precisa ter no minimo 8 caracteries')
    .required('Por favor insira sua senha')
})
