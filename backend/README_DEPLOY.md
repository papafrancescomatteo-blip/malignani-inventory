# Backend deploy

Backend FastAPI per il gestionale inventario laboratorio.

## Variabili richieste

```env
MONGO_URL=mongodb+srv://...
DB_NAME=metrologia
JWT_SECRET=una-stringa-lunga-e-casuale
CORS_ORIGINS=https://dominio-frontend.vercel.app
```

Non pubblicare mai il file `.env` reale.

Per sviluppo locale con MongoDB installato:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
CORS_ORIGINS=*
JWT_SECRET=una-stringa-lunga-e-casuale
```

## Avvio locale

```bash
pip install -r requirements-prod.txt
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

API base:

```text
http://localhost:8000/api
```

## Render / Railway

Build command:

```bash
pip install -r requirements-prod.txt
```

Start command:

```bash
uvicorn server:app --host 0.0.0.0 --port $PORT
```

## Nota Google login

Il login Google e disattivato per non dipendere da servizi esterni. Il login email/password e quello supportato in questa versione.
