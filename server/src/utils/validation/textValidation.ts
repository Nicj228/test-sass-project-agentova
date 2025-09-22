import { withDetails } from '../../../shared/types/errors.js';
import { ERRORS } from '../../../shared/types/errors.js';

export interface TextValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface CreateTextInput {
  title?: string;
  content: string;
}

export function validateTextData(data: CreateTextInput): TextValidationResult {
  const result: TextValidationResult = { valid: true, errors: [], warnings: [] };

  if (!data.content || data.content.trim().length === 0) {
    result.errors.push('Le contenu est requis');
    result.valid = false;
  }

  if (data.content && data.content.length > 5000) {
    result.errors.push('Le contenu ne peut dépasser 5000 caractères');
    result.valid = false;
  }

  if (data.title && data.title.length > 200) {
    result.errors.push('Le titre ne peut dépasser 200 caractères');
    result.valid = false;
  }

  if (data.content && data.content.trim().length < 10) {
    result.warnings.push('Le contenu est très court');
  }

  return result;
}

export function toInvalidInputError(errors: string[]) {
  return withDetails(ERRORS.INVALID_INPUT, {
    message: errors.join(', '),
    errors
  });
}


