import { Request } from 'express';
import { ValidationResult } from '@hapi/joi';
import { validateLoginCredentials, validateRegistrationCredentials } from '../services/validation';

export type ServiceType = `LOGIN` | `REGISTER`;

const validateCredentials = (service: ServiceType) => (req: Request): boolean | string => {
  const validationResults = new Map<string, ValidationResult>();
  validationResults.set(`LOGIN`, validateLoginCredentials(req.body));
  validationResults.set(`REGISTER`, validateRegistrationCredentials(req.body));
  const result = validationResults.get(service);

  if (result?.error) {
    return result.error.details[0].message;
  }

  return true;

  /* ---
    Roughly looks like:

    const validationResult = {
        LOGIN: validateLoginCredentials(req.body),
        REGISTER: validateRegisterCredentials(req.body)
    }
     
  --- */
};

export default validateCredentials;
