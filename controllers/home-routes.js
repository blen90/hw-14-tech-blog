const router = require('express').Router();
// const withAuth = require('../utils/auth');
const User = require("../Models/User.js");

router.get('/', async (req, res) => {
    console.log("Hitting logged in homepage route!!")
    try {
    //   const userData = await User.findAll({
    //     attributes: { exclude: ['password'] },
    //     order: [['name', 'ASC']],
    //   });
  
    //   const users = userData.map((project) => project.get({ plain: true }));
        
      res.render('all-posts', {
        User,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

module.exports = router;
