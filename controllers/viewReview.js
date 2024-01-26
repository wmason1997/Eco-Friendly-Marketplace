const express = require('express');
const router = express.Router();
const { Review } = require('../../models');



router.get('/view/reviews/:userID', async (req, res) => {
    if (req.session && req.session.userID) {
        try {
            const userID = req.params.userID;
            const viewReviews = await Review.findAll({
                where: { userID: userID } // // Query database for reviews with this userId
            });

            // Check if user has reviews
            if (viewReviews.length === 0) {
                return res.send('You have not submitted any reviews');
            } else {
                // Render a view and pass the userReviews to the template
                res.render('userReviews', { reviews: viewReviews });
            }
            
        } catch (error) {
            console.error(error);
            res.status(500).render(error, { message: 'Error retrieving reviews' });
        }
      } else {
        // User is not logged in, send an error message or redirect
        res.status(401).send('User is not logged in.');
    }
});