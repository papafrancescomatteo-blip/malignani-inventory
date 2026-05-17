# Frontend migration

Frontend React per il gestionale inventario laboratorio.

## Avvio locale

Serve Node.js con npm o Yarn installati.

```bash
yarn install
yarn start
```

oppure:

```bash
npm install
npm start
```

## Variabile API

Il frontend legge:

```env
REACT_APP_BACKEND_URL=https://dominio-del-backend
```

In questa copia il file `.env` non punta piu al backend Emergent. Su Render imposta tu il valore:

```env
REACT_APP_BACKEND_URL=https://tuo-backend.onrender.com
```

Quando il backend verra spostato su Render/Railway, sostituire quel valore con il nuovo URL.

Esempio:

```env
REACT_APP_BACKEND_URL=https://tuo-backend.onrender.com
```

## Dipendenze Emergent

- Nessuna dipendenza runtime da Emergent.
- Il login Google e stato rimosso.
- Logo e immagine iniziale sono asset locali in `public/assets`.

Il login email/password usa invece il backend FastAPI e puo essere migrato.
