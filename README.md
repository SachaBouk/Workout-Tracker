# 🏋️ Workout Tracker

Application **Desktop & Web** permettant de suivre ses séances de musculation.  
Développée avec **React + Tauri**, elle fonctionne aussi bien dans un navigateur que comme application desktop.

---

## ✨ Fonctionnalités

- ➕ Ajout d’exercices

- 🧮 Ajout et suppression de séries (répétitions & poids)
- 🗂️ Historique des séances par date
- 💾 Sauvegarde locale (Web & Desktop)
- 🌓 Mode sombre avec persistance
- 🖥️ Application desktop multiplateforme (Tauri)

---

## 🛠️ Stack technique

- **Frontend** : React (Vite)
- **Desktop** : Tauri (Rust)
- **Style** : CSS classique
- **Stockage** :
  - `localStorage` pour la version Web
  - Fichier local via Tauri pour la version Desktop

---

## 📦 Installation

Cloner le dépôt :

```bash
git clone https://github.com/SachaBouk/Workout-Tracker.git
cd workout-tracker
```

Installer les dépendences :

```bash
npm install
```

## ✅ Lancer le projet

### Version Web

```bash
npm run dev
```

### Version Desktop (Tauri)

```bash
npm run tauri dev
```

## 🎯 Objectif du POC

Le but de ce Proof of Concept (POC) est avant tout de découvrir et d’expérimenter de nouvelles technologies.  
L’idée n’est pas de réaliser une application parfaite ou complète, mais de prendre en main des outils que nous ne connaissions pas forcément et de comprendre comment les utiliser dans un projet concret.

À travers ce projet de **Workout Tracker**, j’ai souhaité explorer **Tauri** afin de découvrir comment créer une application desktop légère, tout en utilisant **React** pour la partie interface utilisateur. Ce POC m’a permis de mieux comprendre la structure d’une application, car je n’en avais jamais réalisé auparavant, mais il m’a aussi permis de découvrir comment fonctionne **Rust**, qui est complémentaire à Tauri.

Au final, ce projet m’a surtout permis de voir concrètement comment construire une application de A à Z. Même si ce n’est qu’un POC, j’ai pu expérimenter, tester des idées et mieux comprendre le fonctionnement des outils que je pourrai réutiliser pour mes futurs projets.

