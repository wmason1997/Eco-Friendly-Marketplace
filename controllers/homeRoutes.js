const router = require('express').Router();
const { Item, User } = require('../models');
const withAuth = require('../utils/auth');
const categories = [
  {
    name: 'Cleaning',
    imageUrl: 'https://i.ibb.co/kg75xMm/Cleaning-category.jpg',
  },
  {
    name: 'Clothing',
    imageUrl: 'https://i.ibb.co/mR7pwm8/Clothes-category.jpg',
  },
  {
    name: 'Electronics',
    imageUrl: 'https://i.ibb.co/MBqpwSg/Electronics-category.jpg',
  },
  {
    name: 'Home',
    imageUrl: 'https://i.ibb.co/7yt1wL5/Home-category.jpg',
  },
  {
    name: 'Personal Care',
    imageUrl: 'https://i.ibb.co/tHbWTyr/Personal-Care-category.jpg',
  },
  {
    name: 'Luggage',
    imageUrl: 'https://i.ibb.co/FmhBjGd/Luggage-category.jpg',
  },
  {
    name: 'Toy',
    imageUrl: 'https://i.ibb.co/Fgz2yRq/Toy-category.jpg',
  },
  {
    name: 'Crafting',
    imageUrl: 'https://i.ibb.co/m97B18d/Crafting-category.jpg',
  },
];

router.get('/', async (req, res) => {
  try {
    res.render('homepage', { categories });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.userID, {
      attributes: { exclude: ['password'] },
      include: [{ model: Item, as: 'items' }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.log('Error: ', err); // Add this line for logging
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/'); // was '/profile' but instead I want to be redirected to homepage
    return;
  }

  res.render('login');
});

// router.get('/items/:category', async (req, res) => {
//   try {
//     const category = req.params.category;

//     // Find all items in db that match the specified category
//     const items = await Item.findAll({
//       attributes: ['subcategory'],
//       where: { category: category },
//       group: ['subcategory'], // Group by subcategory to get distinct values
//     });
//     console.log(items);
//     // Extract subcategories and filter out duplicates
//     const subcategories = [...new Set(items.map((item) => item.subcategory))];

//     res.render('', {
//       category: category,
//       subcategories: subcategories,
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

router.get('/items/', async (req, res) => {
  try {
    // Find all items in db that match the specified category
    const items = await Item.findAll({});
    const itemData = items.map((item) => item.get({ plain: true }));
    // console.log(itemData);

    res.render('itemsPg', { itemData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
