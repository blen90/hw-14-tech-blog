const router = require('express').Router();

// GET all galleries for homepage
// router.get('/', async (req, res) => {
//     try {
//       const dbGalleryData = await Gallery.findAll({
//         include: [
//           {
//             model: Painting,
//             attributes: ['filename', 'description'],
//           },
//         ],
//       });

//       const galleries = dbGalleryData.map((gallery) =>
//         gallery.get({ plain: true })
//     }
//       );

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
