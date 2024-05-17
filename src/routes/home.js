const express = require('express');
const { db } = require('../firebase');
const router = express.Router();

// Ruta para renderizar el router con start.hbs
router.get('/', (req, res) => {
    res.render('start');
});

// Ruta para renderizar el router con login.hbs
router.get('/login', async (req, res) => {
    res.render('login');
});

// READ
router.get('/home', async (req, res) => {//ruta navegador
    const querySnapshot = await db.collection('videogames').get();

    const games = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    res.render('home', { games });//router renderizado con home.hbs pasandole contacts
});

/*router.get('/search', async (req, res) => {//ruta navegador
    const querySnapshot = await db.collection('videogames').get();

    const games = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    res.render('search', { games });//router renderizado con home.hbs pasandole contacts
});*/

router.get('/search', async (req, res) => {//ruta navegador

    res.render('search');
});


/*router.get('/searchGame', async (req, res) => {
    const query = req.query.q.toLowerCase(); // Obtener el término de búsqueda y convertirlo a minúsculas
    const querySnapshot = await db.collection('videogames').get();

    const games = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() })) // Mapear los documentos a objetos de juego
        .filter(game => game.name.toLowerCase().startsWith(query)); // Filtrar los juegos que comienzan con el término de búsqueda

    res.render('search', { games, query }); // Renderizar la vista search con los juegos filtrados y el término de búsqueda
});*/
router.get('/searchGame', async (req, res) => {
    const query = req.query.q.toLowerCase();
    const querySnapshot = await db.collection('videogames').get();
  
    const games = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(game => game.name.toLowerCase().startsWith(query))
      .slice(0, 5);
  
    res.json(games);
  });
  
/*
game.name string
game.fav boolean

game.advance number
game.date date

game.info string
game.bkImage string
*/
// CREATE
router.post('/home/newGame', async (req, res) => {
    const { name, fav, advance, date, info, bkImage } = req.body;
    console.log(req.body);

    await db.collection('videogames').add({
        name,
        fav,
        advance,
        date,
        info,
        bkImage
    });

    res.redirect('/home');//manda al READ después de agregar
});

// READ 2
router.get('/home/editGame/:id', async (req, res) => {

    /*const doc = await db.collection('contacts').doc(req.params.id).get();

    res.render('index', { contact: { id: doc.id, ...doc.data() } });
    */
    const doc = await db.collection('videogames').doc(req.params.id).get();
    const querySnapshot = await db.collection('videogames').get();
    const games = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    res.render('home', { game: { id: doc.id, ...doc.data() }, games });
    //router renderizado con home.hbs pasandole contacts y el dato del contacto a editar
});


router.get('/selectedGames/:id', async (req, res) => {

    /*const doc = await db.collection('contacts').doc(req.params.id).get();

    res.render('index', { contact: { id: doc.id, ...doc.data() } });
    */
    const doc = await db.collection('videogames').doc(req.params.id).get();
    const querySnapshot = await db.collection('videogames').get();
    const games = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    res.render('game', { game: { id: doc.id, ...doc.data() }, games });
    //router renderizado con home.hbs pasandole contacts y el dato del contacto a editar
});


// UPDATE
router.post('/home/updateGame/:id', async (req, res) => {
    const { id } = req.params;

    await db.collection('videogames').doc(id).update(req.body);

    res.redirect('/home');//manda al READ después de actualizar
});

// DELETE
router.get('/home/deleteGame/:id', async (req, res) => {
    await db.collection('videogames').doc(req.params.id).delete();

    res.redirect('/home');//manda al READ después de eliminar
});

module.exports = router;
