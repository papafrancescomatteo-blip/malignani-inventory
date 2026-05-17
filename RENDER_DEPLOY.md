# Deploy su Render

Questa cartella contiene tutto il sito separato da Emergent:

- `backend`: API FastAPI
- `frontend`: app React
- `render.yaml`: template Render Blueprint

## 1. Database

Render non gestisce MongoDB nativamente come database principale del progetto. Usa MongoDB Atlas o un MongoDB esterno.

Ti servira una stringa tipo:

```env
MONGO_URL=mongodb+srv://utente:password@cluster.mongodb.net/metrologia?retryWrites=true&w=majority
DB_NAME=metrologia
```

## 2. Carica il progetto su GitHub

Carica tutta questa cartella in un repository GitHub.

Non caricare mai `.env` con segreti reali.

## 3. Render Blueprint

Su Render:

1. New
2. Blueprint
3. scegli il repository
4. Render legge `render.yaml`

Render ti chiedera i valori `sync: false`.

Per il backend:

```env
MONGO_URL=<stringa MongoDB Atlas>
CORS_ORIGINS=https://tuo-frontend.onrender.com
```

Per il frontend:

```env
REACT_APP_BACKEND_URL=https://tuo-backend.onrender.com
```

## 4. Dominio personale

Dopo il deploy, collega il tuo dominio al servizio frontend da:

```text
Frontend service > Settings > Custom Domains
```

Poi aggiorna nel backend:

```env
CORS_ORIGINS=https://tuodominio.it
```

Se vuoi tenere anche il dominio Render temporaneo:

```env
CORS_ORIGINS=https://tuodominio.it,https://tuo-frontend.onrender.com
```

## 5. Primo accesso

Il primo utente registrato diventa admin.

Il login Google e stato rimosso per non dipendere da Emergent. Rimane login email/password.

## 6. Immagini

Logo e immagine iniziale sono locali in:

```text
frontend/public/assets
```

Puoi sostituirle con file reali mantenendo gli stessi nomi:

```text
malignani-logo.svg
lab-cover.svg
```
