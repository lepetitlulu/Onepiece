# 📦 Déploiement Docker -- Projet OnePiece

Ce document explique comment préparer, lancer et développer le projet
**OnePiece** à l'aide de **Docker** et **Docker Compose**.

------------------------------------------------------------------------

## 🚀 1. Prérequis

Avant de commencer, assure-toi d'avoir installé :

-   **Docker**
-   **Docker Compose** (souvent inclus nativement dans Docker Desktop)

Vérification rapide :

``` sh
docker -v
docker compose version
```

------------------------------------------------------------------------

## 🏗️ 2. Structure du projet

Ton projet utilise une architecture Docker multi-stages :

### 🔹 Stage `base`

-   Configure Node.js (`node:22.16-alpine`)
-   Installe les dépendances via `npm ci`
-   Prépare l'environnement minimal partagé

### 🔹 Stage `dev`

-   Copie le code du projet
-   Ajoute et active le script `entrypoint.sh`
-   Ouvre le port 3000
-   Lance `npm run dev` avec écoute sur `0.0.0.0`

------------------------------------------------------------------------

## 🐳 3. Fichiers utilisés

### Dockerfile

``` dockerfile
FROM node:22.16-alpine3.22 AS base

WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS dev
WORKDIR /app
COPY . .
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh
EXPOSE 3000 

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

### docker-compose.yaml

``` yaml
services:
  onepiece:
    build:
      context: .
      target: dev
      dockerfile: Dockerfile
    image: onepiece:dev
    container_name: onepiece
    volumes:
      - ./:/app
    ports:
      - "3000:3000"
```

------------------------------------------------------------------------

## ▶️ 4. Lancer le projet en développement

``` sh
docker compose up --build
```

Accès : http://localhost:3000

Arrêter :

``` sh
docker compose down
```

------------------------------------------------------------------------

## 🔄 5. Développement avec rechargement automatique

Le service utilise un volume :

``` yaml
volumes:
  - ./:/app
```

Modifications locales → directement prises en compte dans le conteneur.

------------------------------------------------------------------------

## 🧪 6. Tester un accès bash dans le conteneur

``` sh
docker exec -it onepiece sh
```

------------------------------------------------------------------------

## 🧹 7. Nettoyer

``` sh
docker system prune -a
```

------------------------------------------------------------------------

## 📦 8. Préparation production (future)

``` dockerfile
FROM base AS prod
COPY . .
RUN npm run build

CMD ["npm", "run", "start"]
```
