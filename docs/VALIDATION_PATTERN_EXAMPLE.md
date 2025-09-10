# 📝 Pattern de Validation - Projet de Test

## ✅ Exemple de Fichier de Validation Métier

### server/src/utils/validation/textValidation.ts
```typescript
import { TextType, CreateTextType } from '../../../shared/types';

export interface TextValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateTextData(data: CreateTextType): TextValidationResult {
  const result: TextValidationResult = {
    valid: true,
    errors: [],
    warnings: []
  };

  // Validation contenu obligatoire
  if (!data.content || data.content.trim().length === 0) {
    result.errors.push('Le contenu est requis');
    result.valid = false;
  }

  // Validation longueur contenu
  if (data.content && data.content.length > 5000) {
    result.errors.push('Le contenu ne peut dépasser 5000 caractères');
    result.valid = false;
  }

  // Validation titre optionnel
  if (data.title && data.title.length > 200) {
    result.errors.push('Le titre ne peut dépasser 200 caractères');
    result.valid = false;
  }

  // Avertissement pour contenu court
  if (data.content && data.content.trim().length < 10) {
    result.warnings.push('Le contenu est très court');
  }

  return result;
}

export function validateTextUpdate(
  existingText: TextType,
  updateData: Partial<TextType>
): TextValidationResult {
  // Validation spécifique pour les mises à jour
  const result: TextValidationResult = {
    valid: true,
    errors: [],
    warnings: []
  };

  // Ne pas permettre de changer le workspace
  if (updateData.workspace_id && updateData.workspace_id !== existingText.workspace_id) {
    result.errors.push('Impossible de changer le workspace d\'un texte');
    result.valid = false;
  }

  return result;
}
```

### Usage dans Firebase Function
```typescript
export const createText = onCall({
  secrets: [databaseUrlProd, jwtWorkspaceSecret]
}, async (request) => {
  try {
    // 1. Auth validation (obligatoire en premier)
    const authResponse = validateAuth(request.auth);
    if (!isSuccess(authResponse)) return authResponse;
    const uid = authResponse.user;

    // 2. Extraction données
    const { workspaceToken, title, content } = request.data;

    // 3. Workspace validation
    const tokenValidation = await verifyWorkspaceToken(workspaceToken, uid, WORKSPACE_ROLES.EDITOR);
    const validationResult = isValidWorkspaceToken(tokenValidation);
    if (!isSuccess(validationResult)) return validationResult;
    const { workspace_id, workspace_tokens } = validationResult;
    const response = createResponseWithTokens(workspace_tokens);

    // 4. ✅ VALIDATION MÉTIER SÉPARÉE
    const textValidation = validateTextData({ title, content });
    if (!textValidation.valid) {
      return response.error(withDetails(ERRORS.INVALID_INPUT, {
        message: textValidation.errors.join(', '),
        errors: textValidation.errors
      }));
    }

    // 5. Logique métier
    const text = await getTextRepository().createText(workspace_id, title, content, uid);

    return response.success({ text });
    
  } catch (error) {
    logger.error('Erreur création texte:', error);
    return handleError(error);
  }
});
```

## ❌ Anti-Pattern à Éviter

```typescript
// ❌ INTERDIT - Validation au mauvais endroit
export const badFunction = onCall({}, async (request) => {
  // ❌ Ne pas faire ça
  const validationResponse = validateRequiredFields(request.data, ['workspaceToken', 'content']);
  if (!isSuccess(validationResponse)) return validationResponse;
  
  // ❌ Validation métier mélangée avec validation technique
  if (!request.data.content || request.data.content.length === 0) {
    return { success: false, error: 'Contenu requis' };
  }
});
```

## 📋 Pattern Enums Obligatoire

### ❌ Interdit
```typescript
type TextStatus = 'draft' | 'published' | 'archived';

interface Text {
  status: TextStatus;
}
```

### ✅ Obligatoire
```typescript
// Dans shared/types.ts
export enum TextStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

interface TextType {
  status: TextStatus;
}

// Usage
const text: TextType = {
  status: TextStatus.DRAFT // Traçable et autocomplété
};
```

## 🔐 Pattern Repository Sécurisé

### ❌ Dangereux
```typescript
async getTextById(id: string): Promise<TextType | null> {
  // DANGEREUX - Pas d'isolation workspace
  const result = await this.pool.query('SELECT * FROM texts WHERE id = $1', [id]);
  return result.rows[0] || null;
}
```

### ✅ Sécurisé
```typescript
async getTextById(id: string, workspaceId: string): Promise<TextType | null> {
  // SÉCURISÉ - Isolation workspace obligatoire
  const result = await this.pool.query(
    'SELECT * FROM texts WHERE id = $1 AND workspace_id = $2',
    [id, workspaceId]
  );
  return result.rows[0] || null;
}
```

## 📁 Services Locaux à Utiliser

### Dates
```typescript
// ✅ Utiliser le service existant
import { DateService } from '@/services/local/dateService';

const formattedDate = DateService.formatChatDate(new Date());
const sessionDate = DateService.formatSessionDate(session.created_at, true);
```

### Authentification
```typescript
// ✅ Utiliser le service existant
import { callSecuredFunction } from '@/services/local/authenticationService';

const result = await callSecuredFunction('createText', workspaceId, {
  title: 'Mon titre',
  content: 'Mon contenu'
});
```

### Icons
```typescript
// ✅ React Icons uniquement
import { RiImageAddLine } from 'react-icons/ri';

<RiImageAddLine className="w-5 h-5" />
```

## 🎯 Ce Pattern Garantit

1. **Séparation claire** : Validation technique vs métier
2. **Réutilisabilité** : Validation métier réutilisable
3. **Testabilité** : Fonctions pures facilement testables
4. **Maintenabilité** : Logique centralisée
5. **Sécurité** : Isolation workspace systématique
6. **Traçabilité** : Enums pour tous les états
