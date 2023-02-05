const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const contactApiRoute = require('./routes/api/contactApiRoute');
const contactRoute = require('./routes/contactRoute');

// on instancie l'application express
const app = new express();

// Définition du moteur de rendu
app.set('view engine', 'ejs');

// parse pour les formulaires
app.use(bodyParser.urlencoded({ extended: false}));

// parse pour le json
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

// définie le dossier ou se trouve les vues
app.set('views'. __dirname + 'views');

// charge le fichier de configuration
dotenv.config();

// On supprime le DepreciationWarning
mongoose.set('strictQuery',true);

mongoose.connect(process.env.MONGO_CONNECTION,
{ useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


// Indique l'url de départ des routes pour contactApiRoute
app.use("/api", contactApiRoute);

// Indique l'url de départ des routes pour contactRoute
app.use("/", contactRoute);

app.listen(8090, () => {
    console.log('Le serveur est démarré sur le port 8090');
});