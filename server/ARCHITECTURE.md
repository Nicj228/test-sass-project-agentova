# 🏗️ Architecture Serveur Agentova

## Vue d'ensemble

Le backend d'Agentova est construit sur **Firebase Functions** avec **TypeScript**, utilisant **PostgreSQL** via **Prisma ORM**. L'architecture suit des patterns strict pour assurer la maintenabilité, la sécurité et la scalabilité.

## 📁 Structure des Dossiers

```
server/
├── db/                    # 🗄️ Couche données
│   ├── prisma/           # Schémas et migrations Prisma
│   │   ├── schema.prisma # Modèles de données
│   │   └── migrations/   # Migrations SQL
│   ├── repositories/     # Pattern Repository
│   └── config.ts         # Configuration base de données
├── src/                  # 💼 Code métier
│   ├── routes/          # 🛣️ Routes HTTP et webhooks
│   ├── services/        # 🔧 Services métier (Firebase Functions)
│   ├── utils/           # 🛠️ Utilitaires transversaux
│   │   ├── validation.ts # Validation centralisée
│   │   ├── authWorkspace.ts # Gestion auth workspace
│   │   ├── wasabiStorage.ts # Stockage fichiers
│   │   └── automation/   # Providers d'automatisation
│   ├── triggers/        # 🔔 Triggers Firebase
│   └── main.ts          # Configuration principale
├── shared/              # 🔗 Types partagés backend
│   └── types/           # Définitions TypeScript backend
└── ../shared/           # 🔄 Types partagés full-stack
    ├── types.ts         # Types communs frontend/backend
    ├── colors.ts        # Constantes de couleurs
    └── onboarding.ts    # Configuration onboarding
```

### Organisation des Types Partagés

1. **`server/shared/`** : Types spécifiques au backend
   - Interfaces internes
   - Types pour les repositories
   - Types pour la validation

2. **`shared/`** (racine du projet) : Types partagés frontend/backend
   - Interfaces communes
   - Enums partagés
   - Types de réponses API
   - Configuration partagée

## 🗄️ Modèles de Données (Prisma)

### Architecture Multi-Tenant
Le système est organisé autour du concept de **Workspace** qui centralise toutes les relations :

```typescript
model Workspace {
  id                String   @id @default(dbgenerated("gen_random_uuid()"))
  name              String   @db.VarChar(50)
  color             String   @db.VarChar(7) // Couleur hex
  owner_id          String
  
  // Relations centralisées
  members           WorkspaceMember[]
  oauth_tokens      OAuthToken[]
  custom_agents     CustomAgent[]
  documents         WorkspaceDocument[]
  automations       WorkspaceAutomation[]
  campaigns         Campaign[]
}
```

### Entités Principales
- **`CustomAgent`** : Agents IA (SAV/Sales) avec documents liés
- **`WorkspaceDocument`** : Gestion des connaissances (info/url/file/image)
- **`OAuthToken`** : Tokens pour intégrations externes
- **`Campaign`** : Campagnes marketing avec posts
- **`WorkspaceAutomation`** : Automatisations par plateforme

## 🔧 Patterns de Code

### 1. Services Pattern (Firebase Functions)

Chaque domaine métier suit cette structure standardisée :

```typescript
// Template de service
export const nomDuService = onCall({
  secrets: [databaseUrlProd, jwtWorkspaceSecret],
  memory: '512MiB',
  timeoutSeconds: 60
}, async (request) => {
  try {
    // 1️⃣ Validation authentification
    const authResponse = validateAuth(request.auth);
    if (!isSuccess(authResponse)) return authResponse;
    const uid = authResponse.user;

    // 2️⃣ Validation des paramètres requis
    const { workspaceToken, param1, param2 } = request.data;
    const validationResponse = validateRequiredFields(request.data, [
      'workspaceToken', 'param1', 'param2'
    ]);
    if (!isSuccess(validationResponse)) return validationResponse;

    // 3️⃣ Validation workspace token + rôles
    const tokenValidation = await verifyWorkspaceToken(
      workspaceToken, 
      uid, 
      WORKSPACE_ROLES.EDITOR
    );
    const validationResult = isValidWorkspaceToken(tokenValidation);
    if (!isSuccess(validationResult)) return validationResult;
    const { workspace_id } = validationResult;

    // 4️⃣ Logique métier
    const result = await getRepository().action(workspace_id, param1, param2);

    // 5️⃣ Réponse standardisée avec tokens
    return createResponseWithTokens().success({ result });
    
  } catch (error) {
    logger.error(`Erreur dans ${nomDuService.name}:`, error);
    return handleError(error);
  }
});
```

### 2. Repository Pattern

Pattern singleton avec lazy initialization pour optimiser les performances :

```typescript
// db/repositories/index.ts
let workspaceRepo: WorkspaceRepository | undefined;

export function getWorkspaceRepository(): WorkspaceRepository {
  if (!workspaceRepo) {
    workspaceRepo = new WorkspaceRepository();
  }
  return workspaceRepo;
}

// Exemple d'implémentation
export class WorkspaceRepository {
  private pool: Pool;

  constructor() {
    this.pool = getPool();
  }

  async getWorkspaceById(id: string): Promise<WorkspaceWithProviders | null> {
    const result = await this.pool.query<WorkspaceWithProviders>(
      `SELECT w.*, 
        COALESCE(
          ARRAY_TO_JSON(ARRAY(
            SELECT provider FROM oauth_tokens WHERE workspace_id = w.id
          ))::jsonb,
          '[]'::jsonb
        ) as providers
       FROM workspaces w WHERE w.id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }
}
```

### 3. Validation en Cascade

Système de validation structuré en couches :

```typescript
// utils/validation.ts

// 🔐 Validation authentification Firebase
export function validateAuth(auth: any): Response<{ user: string }>

// 📝 Validation des champs requis
export function validateRequiredFields(data: any, fields: string[]): Response<{ valide: boolean }>

// 🏢 Validation workspace token + rôles
export async function verifyWorkspaceToken(token: string, uid: string, requiredRole: WorkspaceRole)

// 🎨 Validations métier spécifiques
export function validateHexColor(color: string): boolean
export function validateDocumentConstraints(document: DocumentData): boolean
```

### 4. Gestion d'Erreurs Centralisée

```typescript
// shared/types/errors.ts
export const ERRORS = {
  // Authentification
  UNAUTHENTICATED: { code: 'UNAUTHENTICATED', message: "..." },
  UNAUTHORIZED: { code: 'UNAUTHORIZED', message: "..." },
  
  // Validation
  INVALID_INPUT: { code: 'INVALID_INPUT', message: "..." },
  WORKSPACE_NOT_FOUND: { code: 'WORKSPACE_NOT_FOUND', message: "..." },
  
  // Métier
  CUSTOM_AGENT_NOT_FOUND: { code: 'CUSTOM_AGENT_NOT_FOUND', message: "..." }
};

// Enrichissement avec détails
export function withDetails(error: ErrorType, details: Record<string, any>): MessageError {
  return { ...error, details };
}
```

### 5. Réponses Standardisées

```typescript
// shared/types/responses.ts
export type Response<T> = SuccessResponse<T> | ErrorResponse;

// Factory avec gestion automatique des tokens workspace
export function createResponseWithTokens(workspace_tokens?: WorkspaceTokenMap) {
  return {
    success: <T>(data: T): SuccessResponse<T> => ({
      success: true,
      ...serializeDates(data),
      workspace_tokens
    }),
    error: (error: MessageError): ErrorResponse => ({
      success: false,
      error,
      workspace_tokens
    })
  };
}
```

## 🛣️ Routes & Webhooks

### Routes Publiques

```typescript
// routes/customAgent.ts - Route publique sans auth
export const getPublicCustomAgent = onRequest({
  secrets: [databaseUrlProd],
  cors: true
}, async (request, response) => {
  const id = request.query.id as string;
  const customAgent = await getCustomAgentRepository().getPublicAgentById(id);
  
  response.status(200).json({
    success: true,
    customAgent: toPublicCustomAgent(customAgent)
  });
});
```

### Webhooks avec Pattern Standard

```typescript
// routes/webhooks.ts
export const metaWebhook = onRequest({
  secrets: [metaVerifyToken, facebookSecret, instagramSecret],
  cors: true,
  minInstances: 1
}, async (request, response) => {
  // 1️⃣ Vérification signature
  if (!request.headers["x-hub-signature-256"]) {
    return response.sendStatus(400);
  }

  // 2️⃣ Réponse 200 immédiate (requirement Meta)
  response.status(200).send("EVENT_RECEIVED");

  // 3️⃣ Traitement asynchrone
  try {
    const body = request.body;
    if (body.object === "instagram") {
      await handleInstagramEvent(body);
    }
  } catch (error) {
    logger.error("Erreur webhook Meta:", error);
  }
});
```

## ⚙️ Configuration Environnements

### Secrets Management

```typescript
// main.ts
export const serverToken = defineSecret('SERVER_API_AGENT_TOKEN');
export const jwtWorkspaceSecret = defineSecret('JWT_WORKSPACE_SECRET');
export const databaseUrlProd = defineSecret('DATABASE_URL_PROD');

// URLs par environnement
export const SERVICE_URL = process.env.NODE_ENV === 'development' 
  ? DEV_URLS : PROD_URLS;
```

### Configuration Régionale

```typescript
if (process.env.NODE_ENV === 'development') {
  // Émulateurs Firebase (us-central1 obligatoire)
  setGlobalOptions({
    region: "us-central1",
    concurrency: 15,
  });
} else {
  // Production optimisée EU
  setGlobalOptions({
    region: "europe-west1",
    concurrency: 10,
    memory: '512MiB'
  });
}
```

## 🛠️ Utilitaires Transversaux

### Auth Workspace (`utils/authWorkspace.ts`)
- **Tokens JWT workspace** : Gestion sécurisée des accès
- **Vérification des rôles** : admin/editor avec permissions granulaires
- **États typés** : Retours d'erreur standardisés

### Storage (`utils/wasabiStorage.ts`)
- **Upload/suppression** fichiers vers Wasabi S3
- **Organisation par workspace** : `campaigns/{workspace_id}/`
- **Gestion des erreurs** avec retry automatique

### Automation Providers (`utils/automation/providers/`)
- **Meta Provider** : Facebook/Instagram/WhatsApp
- **Google Provider** : Gmail, Google Ads
- **Pattern uniforme** : Interface standardisée par provider

## 📝 Conventions de Code

### Nommage
- **Services** : `{domain}Service.ts` (ex: `customAgentService.ts`)
- **Repositories** : `{entity}Repository.ts` (ex: `workspaceRepository.ts`)
- **Types** : PascalCase pour les interfaces, camelCase pour les propriétés
- **Constantes** : UPPER_SNAKE_CASE

### Structure des Fonctions
1. **Validation** (auth → params → workspace → métier)
2. **Logique métier** (repository calls)
3. **Réponse standardisée** (success/error avec tokens)

### Logging
```typescript
logger.info(`Action réussie pour workspace ${workspace_id}`);
logger.error(`Erreur dans ${functionName}:`, error);
```

## 🚀 Déploiement

### Scripts
- **`npm run build`** : Compilation TypeScript
- **`npm run deploy`** : Déploiement Firebase Functions
- **`npm run prisma:deploy`** : Migrations base de données

### Migration Pattern
```bash
# Créer migration
npx prisma migrate dev --name add_new_feature

# Déployer en production
npx prisma migrate deploy
```

## 🔍 Exemples Concrets

### Créer un Nouveau Service

1. **Créer le service** dans `src/services/monNouveauService.ts`
2. **Suivre le template** de validation en cascade
3. **Ajouter les types** dans `shared/types/`
4. **Créer le repository** si nécessaire
5. **Exporter** dans `src/main.ts`

### Ajouter une Route

1. **Créer** dans `src/routes/maRoute.ts`
2. **Configuration** : secrets, cors, minInstances
3. **Validation** des paramètres
4. **Traitement** avec gestion d'erreurs
5. **Export** de la fonction

Cette architecture garantit la **consistance**, la **sécurité** et la **maintenabilité** du code serveur Agentova. 