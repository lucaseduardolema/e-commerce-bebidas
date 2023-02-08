import * as yup from "yup";

export const loginFormSchema = yup.object().shape({
  email: yup.string()
    .email('Insira um email válido')
    .required('Por favor insira seu email'),
  password: yup.string()
    .min(8, 'Sua senha precisa ter no minimo 8 caracteries')
    .required('Por favor insira sua senha')
})
