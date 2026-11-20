# PrivAltEvo

Site éditorial et répertoire consacré aux alternatives numériques, à la vie privée, à la souveraineté et aux tests d'outils au quotidien, incluant **Le Report PrivAltEvo**.

## Aperçu

- **Architecture :** Application statique (SPA) en HTML, CSS et JavaScript vanilla, hébergée sur **GitHub Pages**.
- **Identité visuelle :** Thème clair éditorial et mode sombre anthracite adouci (`#1c201e`) avec accents gris sauge (`#9cb0a5`).
- **Publication d'articles :** Gestion des contenus Markdown (`.md`) avec front matter YAML dans le dossier `/articles` via **Pages CMS**, récupérés dynamiquement côté client sur le site.

## Structure du projet

- `index.html` — Structure des pages (accueil, alternatives, indice de confiance, *Le Report PrivAltEvo*, vue de lecture, modale de contact).
- `app.js` — Navigation SPA, filtres, recherche, favoris, rendu des articles et chargement dynamique des fichiers Markdown depuis `/articles`.
- `.pages.yml` — Configuration de **Pages CMS** pour la création et l'édition des articles dans `/articles`.
- `articles/` — Dossier contenant les articles Markdown publiés.

## Publication via Pages CMS

1. Ouvrir **Pages CMS** connecté au dépôt GitHub.
2. Créer ou modifier un article dans la collection `/articles` en renseignant les champs (`title`, `date`, `category`, `excerpt`) et le corps de l'article.
3. Enregistrer pour pousser le fichier `.md` sur la branche `main`.
4. Attendre la mise à jour de **GitHub Pages** pour que le nouvel article apparaisse sur le site.
