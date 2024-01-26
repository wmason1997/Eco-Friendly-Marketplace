const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  // console.log('This is our signup route.');
  try {
    const userData = await User.create(req.body);
    // console.log(userData, "###");
    req.session.save(() => {
      req.session.userID = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
      // redirect to search screen here
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      // console.log('this is for no userdata');
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      // console.log("this is for no valid password");
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.userID = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });

      // redirect to a search page
      
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
