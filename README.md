# Système de Gestion Scolaire

Un système complet de gestion scolaire conçu pour simplifier l'administration des établissements d'enseignement.

## 🎯 Objectif du Projet

Ce projet vise à fournir une solution complète pour la gestion des établissements scolaires, permettant de :
- Gérer les classes et les niveaux d'études
- Administrer les matières et leurs coefficients
- Suivre les années académiques
- Gérer les enseignants et leurs affectations
- Suivre les résultats des élèves

## 🛠 Technologies Utilisées

- **Frontend**:
  - Next.js 14 (App Router)
  - React
  - TypeScript
  - Tailwind CSS
  - Shadcn/UI
  - React Query (TanStack Query)
  - DND Kit (Drag and Drop)

- **Backend**:
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL
  - NextAuth.js (Authentification)

## 📁 Structure du Projet

```
.
├── app/                    # Routes et pages Next.js
│   ├── (auth)/            # Routes d'authentification
│   ├── (dashboard)/       # Routes du tableau de bord
│   └── api/               # Routes API
├── components/            # Composants React
│   ├── ui/               # Composants UI réutilisables
│   └── [feature]/        # Composants spécifiques aux fonctionnalités
├── lib/                   # Utilitaires et configurations
│   ├── services/         # Services API
│   ├── types/            # Types TypeScript
│   ├── utils/            # Fonctions utilitaires
│   └── validations/      # Schémas de validation
├── hooks/                # Hooks React personnalisés
└── prisma/              # Configuration et schéma Prisma
```

## 🚀 Installation

1. Clonez le dépôt :
```bash
git clone [url-du-depot]
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
```bash
cp .env.example .env
```

4. Initialisez la base de données :
```bash
npm run db:push
```

5. Lancez le serveur de développement :
```bash
npm run dev
```

## 📝 Documentation

Pour plus d'informations sur l'utilisation et le développement, consultez :
- [Guide de Contribution](./CONTRIBUTING.md)
- [Licence](./LICENSE.md)