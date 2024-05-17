//CÓDIGO PARA REALIZAR OPERACIONES CON EXPRESS Y FIREBASE

const {Router} = require('express');
const {db} = require('../firebase')//dos carpetas atras
const router = Router();//variable donde queda todo lo que extraemos de express

router.get('/', (req, res) => {
    res.render('start');
});

// Ruta para renderizar login.hbs
router.get('/login', async (req, res) => {
    res.render('login');
});

// Ruta para renderizar index.hbs
router.get('/index', (req, res) => {
    res.render('index');
});

//CONSULTA | READ
router.get('/', async(req,res) => {//solo realiza el get si esta en dicha ruta
    const querySnapshot = await db.collection('contacts').get()//consultamos la coleccion

    /* codigos de apoyo:
    para imprimir el resultado de un documento en consola
    console.log(querySnapshot.docs[0].data());

    para guardar en nuestra variable solo los datos que nos interesan (uno a uno)
    firstName: doc.data().firstName,
    lastName: doc.data().lastName,
    phone: doc.data().phone
    */

    const contacts = querySnapshot.docs.map(doc => ({//variable para guardar solo la data que queremos
        id: doc.id, //porque se encuentra en el titulo del documento, no necesito entrar
        ...doc.data()//asi ya me da todos los datos
    }))

    res.render('index',{contacts})
});


//ESCRITURA | CREATE
//Recibe la petición POST desde el Forms del HTML en un JSON que es el body del req y lo agrega a la BDD
router.post('/newContact', async(req,res) => {
    const {firstName,lastName,phone} = req.body//guardo el cuerpo del JSON en el arreglo

    await db.collection('contacts').add({//llenamos los datos del documento
        firstName,
        lastName,
        phone
    })

    res.redirect('/')//me regresa a la vista inicial index.hbs
});


//PLACEHOLDER PARA EDICIÓN
router.get('/editContact/:id', async (req,res)=> {//va a esperar un id
    const doc = await db.collection('contacts').doc(req.params.id).get()//requerimos ese id para que busque la data de ese documento

    res.render('index',{contact:{id:doc.id,...doc.data()}});//reescribimos con los datos
    
    /*console.log({
        id:doc.id,
        ...doc.data()
    })*/
});


//BORRADO | DELETE
router.get('/deleteContact/:id', async (req,res) => {
    await db.collection('contacts').doc(req.params.id).delete()

    //res.send('contact deleted')
    res.redirect('/')//me regresa a la vista inicial index.hbs
});


//EDICIÓN | UPDATE
router.post('/updateContact/:id', async (req,res) =>  {
    const {id} = req.params

    await db.collection('contacts').doc(id).update(req.body)

    res.redirect('/')//me regresa a la vista inicial index.hbs
})


module.exports = router;//exportamos