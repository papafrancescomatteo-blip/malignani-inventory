# Avvio indipendente da Emergent

Ho scelto una strada portabile: frontend, backend e MongoDB girano insieme con Docker.

Se vuoi pubblicarlo su Render con dominio nuovo, leggi `RENDER_DEPLOY.md`.

## Avvio

```bash
docker compose up --build
```

Poi apri:

```text
http://localhost:8080
```

Il frontend parla con il backend tramite `/api`, quindi non dipende piu dal dominio Emergent.

## Primo account

Il primo utente registrato diventa admin, come previsto dal backend.

## Produzione

Prima di metterlo pubblico cambia questi valori in `docker-compose.yml`:

```env
JWT_SECRET=una-chiave-lunga-e-casuale
DB_NAME=metrologia
```

Se usi un MongoDB esterno, cambia:

```env
MONGO_URL=mongodb+srv://...
```

## Cosa ho disattivato

Ho tolto il pulsante Google Login dal frontend, perche dipendeva da Emergent.
Il login email/password resta funzionante e indipendente.
