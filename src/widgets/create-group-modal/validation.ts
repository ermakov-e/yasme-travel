import * as yup from 'yup';

export const createGroupSchema = yup.object({
  name: yup
    .string()
    .required('Обязательно')
    .min(2, 'Минимум 2 символа'),
  coverImage: yup
    .object({
      file: yup.mixed<File>().required(),
      preview: yup.string().required(),
    })
    .required('Обязательно')
    .nullable(),
  location: yup
    .object({
      lat: yup.number().required(),
      lng: yup.number().required(),
      address: yup.string(),
    })
    .required('Обязательно')
    .test(
      'has-address',
      'Обязательно',
      (value) => value !== null && value !== undefined && value.address !== undefined,
    ),
});
