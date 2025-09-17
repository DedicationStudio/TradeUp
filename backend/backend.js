// server.mjs
import express from 'express';
import cors from 'cors';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldPath } from 'firebase-admin/firestore'; // <-- Admin SDK corretto!
import serviceAccount from './tradeup-f4d91-firebase-adminsdk-fbsvc-369ce674d7.json' assert { type: 'json' };

const app = express();
const port = 3000;

app.use(cors()); // abilita richieste da frontend Angular
app.use(express.json());

// Inizializza Firebase
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

//RESTITUISCE I LIVELLI IN BASE ALLA SEZIONE
app.get('/api/level/:section', async (req, res)=> {
    try{
        const section = parseInt(req.params.section);
        const level = db.collection('Level');

        const query = await level.where('section', '==', section).get();

        if (query.empty) {
        return res.status(404).json({ message: 'Nessun documento trovato' });
        }

        const results = [];
        query.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
        });

        res.json(results);
    } catch (error) {
        console.error('Errore:', error);
        res.status(500).json({ message: 'Errore del server' });
    }
})

//RESTITUISCE LE SEZIONI
app.get('/api/section', async (req, res) => {
    try {
        const section = db.collection('Section');
        const query = await section.get(); // <-- non "level"

        const results = [];
        query.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
        });

        res.json(results);
    } catch (error) {
        console.error('Errore:', error);
        res.status(500).json({ message: 'Errore del server' });
    }
});

//RESTITUISCE LE SEZIONI
app.get('/api/category', async (req, res) => {
    try {
        const section = db.collection('Category');
        const query = await section.get(); // <-- non "level"

        const results = [];
        query.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
        });

        res.json(results);
    } catch (error) {
        console.error('Errore:', error);
        res.status(500).json({ message: 'Errore del server' });
    }
});

//RESTITUISCE LA MISSIONE IN BASE ALL'ID
app.get('/api/mission/:missionId', async (req, res)=> {
    try{
        const section = req.params.missionId;
        const level = db.collection('Mission');

        const query = await level.where(FieldPath.documentId(), '==', section).get();

        if (query.empty) {
        return res.status(404).json({ message: 'Nessun documento trovato' });
        }

        const results = [];
        query.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
        });

        res.json(results);
    } catch (error) {
        console.error('Errore:', error);
        res.status(500).json({ message: 'Errore del server' });
    }
})

//ALL DEFINED BY TAG CORRISPONDENCES ORDERED BY DIFFICULTY
//RESTITUISCE TUTTE LE MISSIONI IN BASE AI TAG
app.post('/api/allmission/by-tags', async (req, res) => {
    try {
        const inputTags = req.body.tags; // Es. ["tutorial", "crypto"]
        if (!Array.isArray(inputTags)) {
            return res.status(400).json({ message: 'Array di tag mancante o non valido' });
        }
        
        const level = db.collection('Mission');
        
        // Firestore non consente OR multipli con array, quindi facciamo una query ampia con 'array-contains-any'
        const querySnapshot = await level
        .where('tag', 'array-contains-any', inputTags.slice(0, 10)) // max 10 elementi
        .get();
        
        
        if (querySnapshot.empty) {
            return res.status(404).json({ message: 'Nessun documento trovato' });
        }
        
        const results = [];
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const docTags = data.tags || [];
            
            // Calcola quante corrispondenze ha con inputTags
            const matchingTagsCount = docTags.filter(tag => inputTags.includes(tag)).length;
            
            results.push({
                id: doc.id,
                ...data,
                matchingTagsCount
            });
        });

        
        // Ordina per numero di tag corrispondenti (discendente)
        results.sort((a, b) => b.matchingTagsCount - a.matchingTagsCount);
        
        res.json(results);
    } catch (error) {
        console.error('Errore:', error);
        res.status(500).json({ message: 'Errore del server' });
    }
});


//RESTITUISCE LA RISPOSTA IN BASE ALL'ID DELLA MISISONE
app.get('/api/answer/:mission', async (req, res)=> {
    try{

        const mission = req.params.mission;
        const table = db.collection('answer');
        const query = await table.where(FieldPath.documentId(), '==', mission).get();


        if (query.empty) {
        return res.status(404).json({ message: 'Nessun documento trovato' });
        }

        const results = [];
        query.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
        });

        res.json(results);
    } catch (error) {
        console.error('Errore:', error);
        res.status(500).json({ message: 'Errore del server' });
    }
});

//RESTITUISCE LE OPZIONI IN BASE ALL'ID MISSIONE
app.get('/api/option/:mission', async (req, res)=> {
    try{

        const mission = parseInt(req.params.mission);
        const table = db.collection('Option_data');
        const query = await table.where('id_mission', '==', mission).get();


        if (query.empty) {
        return res.status(404).json({ message: 'Nessun documento trovato' });
        }

        const results = [];
        query.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
        });

        res.json(results);
    } catch (error) {
        console.error('Errore:', error);
        res.status(500).json({ message: 'Errore del server' });
    }
});

//FA IL LOGIN
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email e password obbligatorie" });
    }

    // Cerca l'account
    const accountRef = db.collection('Account');
    const snapshot = await accountRef.where('email', '==', email).limit(1).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "Account not found" });
    }

    const doc = snapshot.docs[0];
    const accountData = doc.data();

    // Controllo password
    if (accountData.password !== password) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // Prepara la risposta (se vuoi puoi togliere la password)
    const responseData = {
      id_user: doc.id,
      ...accountData
    };

    res.status(200).json({ message: "Login riuscito", user: responseData });
  } catch (error) {
    console.error("Errore login:", error);
    res.status(500).json({ message: "Errore del server" });
  }
});

//CREA L'ACCOUNT
app.post('/api/create-account', async (req, res) => {
  try {
    const { email, password = "", username = "", phone = "", age, userAnalytics = [] } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email obbligatoria" });
    }
    if (!age || typeof age !== "string") {
      return res.status(400).json({ message: "Age obbligatorio e deve essere una stringa" });
    }
    if (!Array.isArray(userAnalytics)) {
      return res.status(400).json({ message: "userAnalytics deve essere un array" });
    }

    // Trova ultimo id numerico
    const accountRef = db.collection('Account');
    const lastDocSnapshot = await accountRef.orderBy('__name__', 'desc').limit(1).get();

    let newId = 1;
    if (!lastDocSnapshot.empty) {
      const lastId = parseInt(lastDocSnapshot.docs[0].id, 10);
      if (!isNaN(lastId)) {
        newId = lastId + 1;
      }
    }

    // Prepara i dati
    const now = new Date();

    const newAccount = {
      id: newId.toString(),   // 👈 aggiunto l'id anche dentro al documento
      account_creation: now,
      lastPlayed: now,
      comment: "This is the fabulous journey you'll take with Trade Up",
      email: email,
      gems: 100,
      money: [{ money: 100, date: now }],
      password: password,
      phone: phone,
      streak: 0,
      username: username,
      age: age,
      userAnalytics: userAnalytics
    };

    // Inserimento
    await accountRef.doc(newId.toString()).set(newAccount);

    // Inizializzazione livelli
    const levelRef = db.collection('Level');
    const statusMissionRef = db.collection('StatusMission');

    const levelSnapshot = await levelRef.get();
    if (!levelSnapshot.empty) {
      for (const doc of levelSnapshot.docs) {
        const id_level = doc.id;
        const data = doc.data();
        const total = data.total || 0;

        const docId = `${newId}_${id_level}`;
        const phaseArray = Array(total).fill(null);

        await statusMissionRef.doc(docId).set({
          id_user: newId.toString(),
          id_level: id_level,
          status: id_level === "1" ? "available" : "not available",
          phase: phaseArray
        });
      }
    }

    // Restituisco anche l'oggetto account con id incluso
    res.status(201).json({ 
      message: "Account creato e livelli inizializzati", 
      id_user: newId, 
      account: newAccount 
    });

  } catch (error) {
    console.error("Errore creazione account:", error);
    res.status(500).json({ message: "Errore del server" });
  }
});



//UPDATE LAST PLAYED
app.post('/api/update-lastplayed', async (req, res) => {
  try {
    const { id_user } = req.body;

    if (!id_user) {
      return res.status(400).json({ message: "id_user obbligatorio" });
    }

    const accountRef = db.collection('Account').doc(id_user.toString());

    const docSnapshot = await accountRef.get();
    if (!docSnapshot.exists) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    const now = new Date(); // 👈 oppure admin.firestore.Timestamp.now()
    await accountRef.update({
      lastPlayed: now
    });

    res.status(200).json({ message: "lastPlayed aggiornato", id_user, lastPlayed: now });
  } catch (error) {
    console.error("Errore aggiornamento lastPlayed:", error);
    res.status(500).json({ message: "Errore del server" });
  }
});

//UPDATE STREAK
app.post('/api/update-streak', async (req, res) => {
  try {
    const { id_user, streak } = req.body;

    if (!id_user) {
      return res.status(400).json({ message: "id_user obbligatorio" });
    }
    if (typeof streak !== "number") {
      return res.status(400).json({ message: "streak deve essere un numero" });
    }

    const accountRef = db.collection('Account').doc(id_user.toString());
    const docSnapshot = await accountRef.get();

    if (!docSnapshot.exists) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    await accountRef.update({
      streak: streak
    });

    res.status(200).json({ message: "Streak aggiornato", id_user, streak });
  } catch (error) {
    console.error("Errore aggiornamento streak:", error);
    res.status(500).json({ message: "Errore del server" });
  }
});



//INSERIMENTO INIZIALE DELLO STATUS DEI LIVELLI PER UN NUOVO UTENTE
app.post('/api/init-user-levels/:id_user', async (req, res) => {
  try {
    const id_user = req.params.id_user;
    const levelRef = db.collection('Level');
    const statusMissionRef = db.collection('StatusMission');

    const levelSnapshot = await levelRef.get();
    if (levelSnapshot.empty) {
      return res.status(404).json({ message: 'Nessun livello trovato' });
    }

    let inseriti = 0;

    for (const doc of levelSnapshot.docs) {
      const id_level = doc.id;
      const data = doc.data();
      const total = data.total || 0; // Default a 0 se non esiste

      const docId = `${id_user}_${id_level}`;
      const statusDoc = await statusMissionRef.doc(docId).get();

      if (statusDoc.exists) {
        continue;
      }

      const phaseArray = Array(total).fill(null);

      await statusMissionRef.doc(docId).set({
        id_user: id_user,
        id_level: id_level,
        status: id_level === "1" ? "available" : "not available",
        phase: phaseArray
      });

      inseriti++;
    }

    res.status(200).json({ message: `${inseriti} livelli inizializzati per l'utente ${id_user}` });
  } catch (error) {
    console.error('Errore:', error);
    res.status(500).json({ message: 'Errore del server' });
  }
});

//AGGIORNAMENTO DELLO STATUS DI OGNI UTENTE PER OGNI MISSIONE
app.post('/api/update-status', async (req, res) => {
  try {
    const { id_user, id_level, status } = req.body;

    if (!id_user || !id_level || !status) {
      return res.status(400).json({ message: 'id_user, id_level e status sono obbligatori' });
    }

    const statusMissionRef = db.collection('StatusMission');

    const querySnapshot = await statusMissionRef
      .where('id_user', '==', id_user)
      .where('id_level', '==', id_level)
      .get();

    if (querySnapshot.empty) {
      return res.status(404).json({ message: 'Nessun documento trovato per questo utente e livello' });
    }

    const docToUpdate = querySnapshot.docs[0];
    await docToUpdate.ref.update({ status });

    res.status(200).json({ message: `Status aggiornato a "${status}" per utente ${id_user}, livello ${id_level}` });
  } catch (error) {
    console.error('Errore:', error);
    res.status(500).json({ message: 'Errore del server' });
  }
});

//TROVA LA PHASE IN BASE ALL'UTENTE E LA MISSIONE
app.get('/api/status/:id_user/:id_level', async (req, res) => {
  try {
    const { id_user, id_level } = req.params;

    const docId = `${id_user}_${id_level}`;
    const statusMissionRef = db.collection('StatusMission').doc(docId);
    const doc = await statusMissionRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Status non trovato per questo utente e livello' });
    }

    const data = doc.data();
    res.status(200).json({
      id_user: data.id_user,
      id_level: data.id_level,
      status: data.status,
      phase: data.phase
    });
  } catch (error) {
    console.error('Errore:', error);
    res.status(500).json({ message: 'Errore del server' });
  }
});

//AGGIORNA L'ARRAY DELLA PHASE DI STATUSMISSION
app.post('/api/update-phase', async (req, res) => {
  try {
    const { id_user, id_level, value } = req.body;

    if (!id_user || !id_level || value === undefined) {
      return res.status(400).json({ message: 'id_user, id_level e value sono obbligatori' });
    }

    const statusMissionRef = db.collection('StatusMission');

    const querySnapshot = await statusMissionRef
      .where('id_user', '==', id_user)
      .where('id_level', '==', id_level)
      .get();

    if (querySnapshot.empty) {
      return res.status(404).json({ message: 'Nessun documento trovato per questo utente e livello' });
    }

    const docToUpdate = querySnapshot.docs[0];
    const data = docToUpdate.data();

    if (!Array.isArray(data.phase)) {
      return res.status(400).json({ message: 'Il campo "phase" non è un array valido' });
    }

    const phase = [...data.phase]; // copia per sicurezza
    const index = phase.indexOf(null);

    if (index === -1) {
      return res.status(200).json({ message: 'Nessun valore null trovato nell\'array phase' });
    }

    phase[index] = value;

    await docToUpdate.ref.update({ phase });

    res.status(200).json({
      message: `Valore aggiornato nella posizione ${index} dell'array phase.`,
      updatedPhase: phase
    });
  } catch (error) {
    console.error('Errore:', error);
    res.status(500).json({ message: 'Errore del server' });
  }
});

//RESET DEL PHASE
app.get('/api/reset-phase/:id_user/:id_level', async (req, res) => {
  try {
    const { id_user, id_level } = req.params;
    const statusMissionRef = db.collection('StatusMission');
    const docId = `${id_user}_${id_level}`;
    // Recupera il documento
    const doc = await statusMissionRef.doc(docId).get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Documento non trovato' });
    }

    const data = doc.data();

    // Ricrea l'array phase con stessi elementi ma tutti null
    const newPhase = Array(data.phase?.length || 0).fill(null);

    // Aggiorna phase e status
    await statusMissionRef.doc(docId).update({
      phase: newPhase,
      status: 'available'
    });

    res.status(200).json({ message: `Phase e status aggiornati per utente ${id_user}, livello ${id_level}` });
  } catch (error) {
    console.error('Errore:', error);
    res.status(500).json({ message: 'Errore del server' });
  }
});


// ✅ OTTIENI TUTTI I DATI DI UN UTENTE DATO ID
app.get('/api/user/:id_user', async (req, res) => {
  try {
    const { id_user } = req.params;

    const userRef = db.collection('Account').doc(id_user);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: `Utente con id ${id_user} non trovato` });
    }

    res.status(200).json({ id_user: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Errore get user:', error);
    res.status(500).json({ message: 'Errore del server' });
  }
});
// ✅ MODIFICA MONEY DI UN UTENTE (con confronto robusto di date)
app.post('/api/update-money', async (req, res) => {
  try {
    const { id_user, money: newMoney } = req.body;

    if (!id_user || newMoney === undefined) {
      return res.status(400).json({ message: 'id_user e money sono obbligatori' });
    }

    const userRef = db.collection('Account').doc(id_user);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: `Utente con id ${id_user} non trovato` });
    }

    let currentMoney = doc.data().money || [];

    // helper: normalizza qualsiasi valore (Timestamp, Date, string) a "YYYY-MM-DD" (locale)
    const toLocalYMD = (val) => {
      if (!val) return null;
      let d;
      // Firestore Timestamp (admin.firestore.Timestamp) ha toDate()
      if (val && typeof val.toDate === 'function') {
        d = val.toDate();
      } else {
        d = new Date(val);
      }
      if (isNaN(d.getTime())) return null;
      const Y = d.getFullYear();
      const M = String(d.getMonth() + 1).padStart(2, '0');
      const D = String(d.getDate()).padStart(2, '0');
      return `${Y}-${M}-${D}`;
    };

    const today = new Date();
    const todayYMD = toLocalYMD(today);

    if (currentMoney.length > 0) {
      const lastEntry = currentMoney[currentMoney.length - 1];

      const lastYMD = toLocalYMD(lastEntry.date);
      // DEBUG (togli se vuoi)
      console.log('todayYMD:', todayYMD, 'lastYMD:', lastYMD, 'lastEntry.date raw:', lastEntry.date);

      if (lastYMD && lastYMD === todayYMD) {
        // stessa data → sovrascrivi (non sommare)
        lastEntry.money = newMoney;
      } else {
        // data diversa → push nuovo oggetto con Date (Firestore lo convertirà in Timestamp)
        currentMoney.push({ money: newMoney, date: today });
      }
    } else {
      // array vuoto → push nuovo oggetto
      currentMoney.push({ money: newMoney, date: today });
    }

    await userRef.update({ money: currentMoney });

    res.status(200).json({
      message: `Money aggiornato per utente ${id_user}`,
      money: currentMoney,
    });
  } catch (error) {
    console.error('Errore update money:', error);
    res.status(500).json({ message: 'Errore del server' });
  }
});





app.listen(port);