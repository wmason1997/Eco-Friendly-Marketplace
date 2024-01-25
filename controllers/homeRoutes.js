const router = require('express').Router();
const { Item, User } = require('../models');
const withAuth = require('../utils/auth');


const categoryImageMap = {
  "Cleaning": "/path/to/default.jpg",
  "Personal Care": "/path/to/default.jpg",
  // add other categories
};

// Get route to find category property in Item model and then display categories on the home page per the wireframe
router.get('/', async (req, res) => {
  try {
      const categories = await Item.findAll({
          attributes: ['category'],
          group: ['category']
      });

      const categoriesWithImages = categories.map(item => {
        return {
            name: item.category,
            image: categoryImageMap[item.category] || '/path/to/default.jpg' // Fallback to a generic default image(need to change to actual path once images are uploaded)
        };
    });

      res.render('homepage', {
        categories: categoriesWithImages
              });
  
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
      logged_in: req.session.logged_in
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
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/items/:category', async (req, res) => {
  try {
      const category = req.params.category;

     // Find all items in db that match the specified category
      const items = await Item.findAll({
          attributes: ['subcategory'],
          where: { category: category },
          group: ['subcategory'] // Group by subcategory to get distinct values
      });
      console.log(items);
      // Extract subcategories and filter out duplicates
      const subcategories = [...new Set(items.map(item => item.subcategory))];

      res.render('subcategoriesPg', {
          category: category,
          subcategories: subcategories
      });

  } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
  }
});


router.get('/items/', async (req, res) => {
  try {

     // Find all items in db that match the specified category
      const items = await Item.findAll({

      });
      const itemData = items.map(item => item.get({plain: true}));
      console.log(itemData);

      res.render('itemsPg', 
    {itemData}
      );

  } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
