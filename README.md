# Pneumo - Application de Suivi Médical

## Description

Pneumo est une application web moderne développée avec Next.js 15.2, conçue pour le suivi médical et la gestion des données de santé. L'application utilise des technologies de pointe pour offrir une expérience utilisateur optimale et sécurisée.

## Technologies Principales

- **Frontend:**

  - Next.js 15.2.0
  - React 19
  - TailwindCSS
  - HeadlessUI/React pour les composants UI
  - Chart.js et Recharts pour la visualisation des données

- **Backend & Services:**
  - Firebase (Authentication, Firestore, Storage)
  - React Query pour la gestion des états
  - Zod pour la validation des données

## Fonctionnalités

- Authentication sécurisée via Firebase
- Interface utilisateur responsive et moderne
- Système de thèmes clair/sombre
- Visualisation de données médicales
- Gestion des formulaires avec React Hook Form
- Notifications avec React Hot Toast

## Prérequis

- Node.js (version LTS recommandée)
- npm ou yarn
- Un compte Firebase

## Installation

1. Cloner le repository :
   ```bash
   git clone [url-du-repo]
   cd pneumo
   ```

2. Installer les dépendances :
   ```bash
   npm install
  ou

```bash
yarn install
```


3. Configurer les variables d'environnement :
   Créer un fichier \`.env.local\` à la racine du projet avec les configurations Firebase nécessaires.

4. Lancer le serveur de développement :
   ```bash
   npm run dev

  ou
```bash
yarn dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Structure du Projet

- `/src/app` - Routes et pages de l'application
- `/src/components` - Composants React réutilisables
- `/src/contexts` - Contextes React pour la gestion d'état globale
- `/src/firebase` - Configuration et services Firebase
- `/src/hooks` - Hooks React personnalisés
- `/src/lib` - Utilitaires et fonctions helpers
- `/src/types` - Définitions TypeScript
- `/prisma` - Configuration de la base de données

## Scripts Disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run start` - Lance l'application en mode production
- `npm run lint` - Vérifie le code avec ESLint

## Déploiement

L'application peut être facilement déployée sur la plateforme Vercel :

1. Connectez votre repository à Vercel
2. Configurez vos variables d'environnement
3. Déployez !

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou soumettre une pull request.

## Licence

Ce projet est sous licence privée.
