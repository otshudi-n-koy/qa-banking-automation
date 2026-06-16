# qa-banking-automation

> Framework QA Automation — Banking context  
> Built with Playwright + TypeScript

## 🎯 Objectif

Framework d'automatisation des tests conçu pour un contexte bancaire exigeant.  
Développé comme démonstrateur technique dans le cadre d'une candidature Test Manager,  
applicable à tout SI bancaire (private banking, gestion de portefeuilles, conformité).

## 🏗️ Architecture

qa-banking-automation/

├── pages/          # Page Object Models

├── fixtures/       # Fixtures par rôle utilisateur

├── tests/

│   ├── e2e/        # Tests End-to-End UI

│   └── api/        # Tests API REST

├── data/           # Jeux de données de test

└── utils/          # Fonctions utilitaires

## 🧪 Couverture actuelle

| Module | Tests | Statut |
|--------|-------|--------|
| Authentification | 4 | ✅ |
| Catalogue produits | En cours | 🚧 |
| Panier / Commande | Planifié | 📋 |
| Tests API | Planifié | 📋 |

## 🚀 Lancer les tests

```bash
# Installer les dépendances
npm install
npx playwright install

# Lancer tous les tests
npx playwright test

# Lancer un module spécifique
npx playwright test tests/e2e/auth.spec.ts

# Mode headed (voir le navigateur)
npx playwright test --headed

# Rapport HTML
npx playwright show-report
```

## 🛠️ Stack technique

- **Playwright** — framework d'automatisation E2E
- **TypeScript** — typage statique
- **GitHub Actions** — CI/CD
- **Page Object Model** — pattern de maintenabilité
- **Fixtures** — gestion des rôles et contextes

## 📊 Patterns utilisés

- **Page Object Model (POM)** — séparation locators / logique / tests
- **Data-driven testing** — données de test externalisées
- **Fixtures par rôle** — authentification centralisée
- **Multi-browser** — Chromium, Firefox

## 👤 Auteur

**N'Koy OTSHUDI** — QA Senior Automation Engineer  
🌐 [nkoyotshudi.fr](https://nkoyotshudi.fr)  
💻 [github.com/otshudi-n-koy](https://github.com/otshudi-n-koy)