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


router.get('/', async (req, res) => {
  try {
    //Get all the post and join with user data
    const postData = await Post.findAll({
      // attibutes: ['created-at', 'id', 'post', 'title'],
      include: [{
        model: User,
        attributes: ['userName'],

        model: Comment, 
        attributes: ['created_at', 'id', 'comment', 'post_id', 'user_id'],
      }],
    });
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('all-posts', {
      posts,
      logged_in: req.session.logged_in
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
