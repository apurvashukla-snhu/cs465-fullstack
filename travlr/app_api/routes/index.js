const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payLoad'
});

router.route('/login').post(authController.login);
router.route('/trips').get(tripsController.tripsList).post(auth, tripsController.tripsAddTrip);
router.router('/trips/:tripCode').get(tripsController.tripsFindCode).put(auth, tripsController.tripsUpdateTrip);
router.route('/register').post(authController.register);

