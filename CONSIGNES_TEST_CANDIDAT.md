# 🎯 TEST TECHNIQUE - CONSIGNES CANDIDAT

## 📋 OBJECTIF
Évaluer votre maîtrise de **Cursor** et votre capacité à comprendre et respecter une **architecture existante**.

## 🎥 FORMAT REQUIS - ENREGISTREMENT OBLIGATOIRE

### 📹 **ENREGISTREMENT VIDÉO COMPLET**
- **OUTILS RECOMMANDÉS** : 
  - [Screen Capture](https://screencapture.com) (en ligne, gratuit)il nécessite le téléchargement juste après car le logiciel n'héberge pas et vidéos
  - Logiciel natif de votre ordinateur 
- **CAPTURE D'ÉCRAN COMPLÈTE** : Enregistrement d'écran du début jusqu'à la fin
- **TOUTE LA PROGRESSION** : Filmez absolument tout votre processus de travail
- **AUDIO OPTIONNEL** : Le son n'est pas obligatoire, vous pouvez couper le micro
- **CONTINUITÉ** : Enregistrement en continu, montrez votre processus de réflexion

### ⏱️ **GESTION DE LA DURÉE ET TAILLE**
- **Vidéos longues** : Nouvelle vidéo toutes les 30 minutes pour éviter des fichiers trop lourds
- **Qualité** : 1080p minimum pour la lisibilité
- **Pas de coupure** : Chaque segment doit être continu (pas de montage)
- **Numérotez** : "Partie 1/3", "Partie 2/3", etc. si plusieurs vidéos

### 👀 **CE QUE NOUS OBSERVONS**
- Votre workflow et utilisation de Cursor
- Votre méthodologie de débogage
- Votre respect des bonnes pratiques
- Votre processus de réflexion complet

### 🚨 **IMPORTANCE CRITIQUE DE L'ENREGISTREMENT**
- **OBLIGATOIRE POUR VALIDATION** : Sans enregistrement vidéo = test non validé
- **TOUT DOIT ÊTRE FILMÉ** : Du premier clic jusqu'à la démonstration finale
- **PROCESSUS COMPLET** : Nous devons voir comment vous travaillez, pas seulement le résultat
- **AUCUNE EXCEPTION** : L'enregistrement est la partie la plus importante du test

### 📤 **TRANSMISSION DES VIDÉOS**
- **Plateforme** : WeTransfer (gratuit jusqu'à 2GB)
- **Compression** : Compressez vos vidéos en 1080p minimum
- **Format** : MP4 de préférence
- **Lien de téléchargement** : Envoyez le lien WeTransfer dans votre livrable

## 📚 PRÉPARATION OBLIGATOIRE
**AVANT de commencer l'enregistrement**, vous devez :

1. **Regarder la vidéo de formation** : [Formation Cursor](https://www.youtube.com/watch?v=6fBHvKTYMCM)
2. **Lire attentivement** : `CURSOR_LEARN.md` (automatismes essentiels)
3. **Installer** : Cursor, Node.js 18+, Firebase CLI
4. **🔄 FORK le projet** : Forkez ce repository sur votre profil GitHub personnel
5. **Cloner VOTRE fork** et installer les dépendances (pas le projet original)

### 🎯 **ENTRAÎNEMENT RECOMMANDÉ**
**Pour maximiser vos chances de réussite** :
- **Pratiquez Cursor** sur un petit projet avant le test
- **Testez votre outil d'enregistrement** (Screen Capture ou logiciel natif)
- **Familiarisez-vous** avec les modes Ask/Agent de Cursor
- **Ne soyez pas en découverte** pendant l'enregistrement du test

## 🚀 EXERCICE PRATIQUE

### **PARTIE 1 : Faire fonctionner le projet**
**Objectif final** : Avoir un projet entièrement fonctionnel où le client et le serveur communiquent correctement.

**Résultats attendus** :
- ✅ **Client et serveur démarrent** sans erreur
- ✅ **Application accessible** sur `http://localhost:3000`
- ✅ **Communication client-serveur** : Pouvoir envoyer des données du client vers le serveur
- ✅ **Interface textService** : Vue permettant de voir et créer des textes
- ✅ **Build réussi** : `npm run build` fonctionne sans erreur (client ET serveur)
- ✅ **Architecture respectée** : **IMPORTANT** - Le `textService.ts` ne respecte actuellement PAS les règles `.cursor/rules/`. Vous devez le corriger pour qu'il respecte les patterns Agentova (côté client ET serveur)

### **PARTIE 2 : Créer un service de commentaires**
**Objectif final** : Développer un système complet de gestion des commentaires en respectant l'architecture existante.

**Résultats attendus** :
- ✅ **Service complet** : `commentService.ts` côté client et serveur
- ✅ **Fonctionnalités CRUD** : Créer, lister, supprimer des commentaires
- ✅ **Types et validation** : Respect des patterns Agentova (types partagés, validation cascade)
- ✅ **Interface utilisateur** : Intégration dans la page dashboard
- ✅ **Architecture cohérente** : Suit exactement les mêmes patterns que les services existants

## ⚡ AUTOMATISMES OBLIGATOIRES

### 🔥 **CRITÈRES ÉLIMINATOIRES si non respectés**
- [ ] **Drag & Drop** : Documentation + règles au début
- [ ] **Communication globale** : Demandes complètes à Cursor (pas micro-étapes)
- [ ] **Review systématique** : Examiner chaque modification avant validation
- [ ] **Privilégier l'IA** : 90%+ du code généré par Cursor

### 🎯 **WORKFLOW ATTENDU**
1. **Setup** : Drag & drop `.cursor/rules/` + `docs/` + fichiers spécifiques
2. **Compréhension** : Demander à Cursor d'analyser le projet
3. **Planification** : Mode Ask pour comprendre les problèmes
4. **Exécution** : Mode Agent pour générer les solutions
5. **Validation** : Review modification par modification

## 📊 ÉVALUATION

### 🟢 **CE QUI SERA ÉVALUÉ**
- **Maîtrise Cursor** : Utilisation efficace des modes Ask/Agent
- **Compréhension architecture** : Respect des patterns Agentova
- **Qualité du code** : Types, validation, conventions
- **Processus de debug** : Méthodologie de résolution des erreurs
- **Efficacité globale** : Capacité à atteindre tous les objectifs

### 🔴 **ERREURS ÉLIMINATOIRES**
- **Coder manuellement** au lieu d'utiliser Cursor pour générer le code
- **Ne pas drag & drop** la documentation et les règles au début
- **Valider en bloc** sans examiner et comprendre chaque modification
- **Ne pas respecter** l'architecture existante et les patterns Agentova


## 📤 LIVRABLE FINAL

### 🔄 **FORK ET REPOSITORY GITHUB**
- **Fork obligatoire** : Forkez ce projet sur votre profil GitHub personnel
- **Travail sur votre fork** : Effectuez toutes vos corrections sur votre fork
- **❌ PAS DE PULL REQUEST** : Ne faites surtout pas de Pull Request vers le projet original
- **Repository public** : Votre fork doit être accessible publiquement
- **Lien GitHub** : Envoyez le lien de votre repository corrigé

### 🎥 **ENREGISTREMENT VIDÉO**
- **Format** : Lien WeTransfer avec vidéos compressées en 1080p minimum
- **Contenu** : Processus complet du début à la fin
- **Qualité** : Écran lisible, actions visibles
- **Segments** : Si plusieurs vidéos, numérotez-les clairement

### ⏰ **DÉLAI ET PRIORITÉS**
- **Priorité 1** : L'enregistrement vidéo (plus important que le code parfait)
- **Priorité 2** : Repository GitHub avec code corrigé et fonctionnel

---

**Bonne chance ! 🚀**

*Montrez-nous votre expertise avec Cursor et votre compréhension de l'architecture moderne !*
