import * as yup from 'yup';
import { facebook, google } from '../firebase/firebaseConfig';
const passwordRegex =
  /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,10}$/;

export const schemaRegister = yup.object({
  name: yup.string().required("Por favor ingresar su nombre completo"),
  email: yup
    .string()
    .email("Debe ingresar un email")
    .required("Por favor ingresar su email"),
  password: yup
    .string()
    .required("Por favor ingresar contraseña")
    .min(8, "La contraseña debe contener al menos 8 caracteres")
    .max(10, "La contraseña debe contener máximo 10 caracteres")
    .matches(passwordRegex, {
      message:
        "La contraseña al menos debe tener un dígito, una minúscula, una mayúscula y al menos un caracter no alfanumérico",
    })
    .oneOf([yup.ref("repeatPassword")], "La contraseña ingresada no coincide"),
  repeatPassword: yup
    .string()
    .required("Por favor ingresar contraseña")
    .min(8, "La contraseña debe contener al menos 8 caracteres")
    .max(10, "La contraseña debe contener máximo 10 caracteres")
    .matches(passwordRegex, {
      message:
        "La contraseña al menos debe tener un dígito, una minúscula, una mayúscula y al menos un caracter no alfanumérico",
    })
    .oneOf([yup.ref("password")], "La contraseña ingresada no coincide"),
  phone: yup.number('Profavor ingrese un número valido').min(10, 'El número debe contener 10 digitos 2').positive().required('Porfavor ingresar su nombre completo'),

});
export const schemaLogin = yup.object({
  email: yup.string().email('Porfavor ingrese un correo valido').required('Porfavor ingrese su correo'),
  password: yup.string().required('Porfavor ingrese su contraseña').min(8, 'La contraseña debe contener minimo 8 caracteres').max(16, 'La contraseña debe contener maximo 16 caracteres.').matches(passwordRegex, {
    message: "La contraseña al menos debe tener un valor numérico, una minúscula, una mayúscula y al menos un caracter no alfanumérico."
  })
})
export const inputList = [
  {
    label: "Nombre",
    type: "text",
    name: "name",
  },
  {
    label: "Categoría",
    type: "select",
    name: "category",
  },
  {
    label: "Descripción",
    type: "textarea",
    name: "description",
  },
  {
    label: "Precio",
    type: "number",
    name: "price",
  },
  {
    label: "Cantidad",
    type: "number",
    name: "quantity",
  },
  {
    label: "Imagen",
    type: "file",
    name: "image",
  },
];

export const category = [
  {
    label: "paleta de agua",
    value: 1,
  },
  {
    label: "paleta de crema",
    value: 2,
  },
  {
    label: "paleta mixta",
    value: 3,
  },
  {
    label: "paleta con relleno",
    value: 4,
  },
];
export const loginProvider = [
  {
    name: "google",
    image: "https://assets.stickpng.com/images/5847f9cbcef1014c0b5e48c8.png",
    provider: google,
  },
  {
    name: "facebook",
    image: "https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-3-1.png",
    provider: facebook,
  },
];