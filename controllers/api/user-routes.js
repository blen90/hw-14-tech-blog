const router = require('express').Router();
const User = require('../../models/User.js');

//Create new user
router.post('/', async (req, res) => {
  console.log("We Hit the CREATE USER ROUTE", req.body)
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    console.log(newUser);

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.name = newUser.name;
      req.session.email = newUser.email;
      req.session.password = newUser.password;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });

  } catch (err) {
    console.log("Error", err)
    res.status(500).json(err);
  }
});

//User login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({
        message: "The email or password you entered is incorrect. Please try again."
      });

      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: "The email or password you entered is incorrect. Please try again."
      });

      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "Login successful." });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//User logout
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