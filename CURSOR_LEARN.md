# 🎯 GUIDE CURSOR

## 📋 PHILOSOPHIE DU DÉVELOPPEMENT MODERNE
**L'IA GÉNÈRE, VOUS GUIDEZ ET VALIDEZ**

Le métier a évolué. Le développeur moderne doit :
- **Privilégier l'IA** pour générer 90%+ du code (petites modifs manuelles acceptées)
- Être un **expert en communication avec l'IA** pour des demandes globales efficaces
- Maîtriser l'art de **bien expliquer globalement** ce que vous voulez
- Faire de la **review de code intelligente** et des ajustements fins (10% restant)
- **Comprendre, analyser et valider** le code généré par l'IA
- **Se remettre en question** si beaucoup de code manuel est nécessaire

Si vous préférez coder manuellement les fonctionnalités, ce poste n'est pas fait pour vous.

## 🎥 VIDÉO DE FORMATION

**Vidéo obligatoire à regarder** : [Formation Cursor](https://www.youtube.com/watch?v=6fBHvKTYMCM)

**Points complémentaires essentiels** (en plus de la vidéo) :

### ⚡ LES 6 AUTOMATISMES ESSENTIELS À MAÎTRISER

1. **DRAG & DROP SYSTÉMATIQUE**
   - Glisser-déposer TOUS les fichiers de règles/documentation au début
   - Ne JAMAIS commencer sans avoir intégré le contexte complet (SAUF pour petites actions ponctuelles)
   - **RÈGLE D'OR** : Si modification architecturale → TOUJOURS intégrer règles + documentation complète
   - **Type 1 - Drag & drop de compréhension** : Documentation/règles pour qu'il comprenne le projet
   - **Type 2 - Drag & drop de référence** : Fichiers spécifiques pour donner les références exactes
   - **CRUCIAL** : Prendre fichier dans arborescence gauche et le glisser dans le chat (pas décrire verbalement)
   - **Exemple** : "Dans ce fichier je veux ça, dans ce fichier je veux ça" (avec références drag & drop)
   - Vérifier que Cursor a bien "ingéré" les fichiers (voir dans le chat)

2. **LANCEMENT DE CONTEXTE OPTIMAL**
   - **Pour modifications architecturales** : "Analyse tout le projet et dis-moi comment celui-ci s'organise et les subtilités"
   - **Pas juste** "Explique-moi ce projet" mais une analyse complète de l'organisation
   - Demander à Cursor de résumer les règles après drag & drop
   - Vérifier la compréhension avant de commencer à coder

3. **COMMUNICATION GLOBALE OPTIMALE**
   - **RÈGLE D'OR** : Expliquer TOUT en gros blocs plutôt que micro-étapes
   - **Gain de temps énorme** : Donner tout le contexte d'un coup pour générer 90%+ du code
   - **Workflow** : Contexte complet → Demande globale → Génération massive → Ajustements fins
   - **Utiliser la dictée vocale** si possible (syntaxe parfaite non obligatoire)
   - Vérifier que Cursor a compris TOUTES les subtilités avant de lancer

4. **MODES CURSOR - QUAND UTILISER QUOI**
   - **Mode Agent (@)** : Pour les tâches complexes multi-fichiers
   - **Mode Ask** : Pour les questions ponctuelles et la compréhension
   - **Cmd+K** : Pour les modifications rapides inline

5. **MULTITÂCHE ET ORGANISATION**
   - **CRUCIAL** : Aller en bas d'une réponse → cliquer à droite pour dupliquer le chat
   - **Multi-projets** : Serveur + Client = 2 projets séparés avec onglets différents
   - **Multi-tâches** : Plusieurs fonctionnalités en parallèle dans le même projet
   - **Retour en arrière** : Reprendre un chat à une étape précédente pour relancer
   - **Workflow** : Chat principal pour contexte → Duplication pour sous-tâches spécifiques

6. **VALIDATION ET RESPONSABILITÉ - LE PLUS IMPORTANT**
   - **VOTRE TRAVAIL = REVIEW + GUIDAGE + VALIDATION** (pas coder manuellement)
   - **Si Cursor fait mal** → C'est VOTRE faute (mauvais contexte/références)
   - **Workflow de validation** :
     1. **Mode Ask** : Grosse modif → Donner TOUT le contexte → Vérifier compréhension
     2. **Mode Agent** : Une fois validation compréhension → Lancer génération
     3. **Review** : Examiner CHAQUE modification avant validation
     4. **Debugging** : Comprendre et corriger, ne jamais coder manuellement
   - **Règle** : Si ça ne marche pas → Améliorer le contexte, pas coder à la main
   - **Nuance importante** : Petites modifications ponctuelles peuvent se faire manuellement
   - **Réflexe à prendre** : Lancer des chats le plus possible pour réfléchir et avancer plus vite

---

## 💡 BONNES PRATIQUES GÉNÉRALES

### 🚀 POUR ÊTRE EFFICACE
1. **Préparez votre environnement** avant de commencer
2. **Drag & drop systématique** : Documentation + règles dès le début
3. **Diagnostic méthodique** : Demander à l'IA d'analyser avant d'agir
4. **Review systématique** : Modification par modification, jamais en bloc

### 🎯 POUR PRODUIRE DU CODE DE QUALITÉ
1. **Diagnostic rapide** : Identifier les problèmes rapidement
2. **Respect strict** des patterns architecturaux existants
3. **Services complets** : Types + validation + intégration
4. **Démonstration fonctionnelle** : Toujours tester le résultat

### ⚠️ PIÈGES À ÉVITER ABSOLUMENT

**Le réflexe naturel** quand quelque chose ne fonctionne pas est de penser "l'IA ne comprend pas" ou "le code généré n'est pas bon". C'est compréhensible, mais **c'est l'occasion parfaite de progresser**. Si l'IA produit un résultat inattendu, c'est généralement que le contexte, les références, ou l'explication peuvent être améliorés. Un développeur moderne développe le réflexe de **d'abord améliorer sa communication** avant de chercher d'autres solutions.

**L'habitude à éviter** : "Je vais le faire manuellement, c'est plus rapide." Cette approche est naturelle quand on débute, mais elle limite énormément votre productivité. Si vous vous retrouvez à coder manuellement plus de 10% du temps, **c'est le signal qu'il y a une opportunité d'amélioration**. Prenez un moment pour enrichir votre contexte, vos références, ou reformuler votre demande. L'IA peut accomplir des tâches impressionnantes quand elle dispose des bonnes informations.

**Une approche courante mais limitante** est d'expliquer son besoin en micro-étapes : "Crée une fonction, puis ajoute un paramètre, puis..." Il est plus efficace de communiquer globalement : "Je veux un service complet de gestion des utilisateurs avec CRUD, validation et intégration dans l'architecture existante." La communication globale génère beaucoup plus de code d'un coup et fait gagner un temps précieux.

**Un autre écueil fréquent** est d'accepter toutes les modifications en bloc sans les examiner. Votre vraie valeur ajoutée réside dans votre capacité à **comprendre, analyser et valider** chaque modification. Si vous ne saisissez pas ce que l'IA a généré, n'hésitez pas à lui demander d'expliquer sa démarche avant de valider.

---

**Ce guide présente les meilleures pratiques pour un développement moderne avec l'IA.**
