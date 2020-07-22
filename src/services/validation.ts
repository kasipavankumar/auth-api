import Joi, { ValidationResult } from '@hapi/joi';

export interface IRegistrationData {
  name: string;
  email: string;
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export const validateRegistrationCredentials = (
  dataToValidate: IRegistrationData
): ValidationResult => {
  const validationSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return validationSchema.validate(dataToValidate);
};

export const validateLoginCredentials = (dataToValidate: ILoginData): ValidationResult => {
  const validationSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return validationSchema.validate(dataToValidate);
};
