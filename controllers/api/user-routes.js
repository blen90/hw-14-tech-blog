const router = require('express').Router();
const User = require('../../Models/User.js');


router.post('/', async (req, res) => {
  console.log("We Hit the CREATE USER ROUTE", req.body)
  
  try {
    const newUser = await User.create({
      userName: req.body.userName,
      password: req.body.password,
    });
console.log(newUser)
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.userName= newUser.userName;
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})


router.post('/login', async (req, res) => {
  console.log("Were in /LOGIN USER ROUTES", req.body)
  try {
    const userData = await User.findOne({ where: { username: req.body.userName } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
