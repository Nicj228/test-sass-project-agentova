# 🏗️ Architecture du Projet de Test

## 📁 Structure générale
```
sass-project/
├── client/          # Frontend React/Next.js
├── server/          # Backend Firebase Functions  
├── shared/          # Types partagés
└── docs/            # Documentation
```

## 🎯 Frontend (client/)
- **modules/**: Module de chat uniquement
- **services/api/**: Services Firebase (simulés)
- **hooks/**: React Query pour la gestion des données
- **components/**: Composants UI réutilisables

## 🔥 Backend (server/)
- **src/services/**: Firebase Functions (`textService`)
- **db/repositories/**: Accès données (simulé en mémoire)
- **shared/**: Réponses et gestion d'erreurs standardisées

## 📦 Types partagés (shared/)
- **types.ts**: Tous les types partagés entre client et serveur
- Enums obligatoires (pas de string unions)

## 🔑 Règles importantes
1. **Services statiques**: Toutes les méthodes doivent être `static`
2. **Types centralisés**: Utiliser `shared/types.ts` uniquement
3. **workspace_id**: Premier paramètre partout
4. **Authentification simulée**: Structure respectée mais sans vraie sécurité

```

Accès: `http://localhost:3000`
