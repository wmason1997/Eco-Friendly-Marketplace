const express = require('express');
const router = express.Router();
const { Review } = require('../../models');
const { v4: uuidv4 } = require('uuid'); 

// POST route to add a item review to the database only if the user is logged in
router.post('/add/review/:userID', async (req, res) => {
        try {
            const userID = req.params.userID; 
            const { itemID, stars, reviewText } = req.body;
            const addReview = await Review.create({
                itemID, 
                userID,
                stars, 
                reviewText
            });

            res.status(201).json({ review: addReview, message: 'Review added successfully'});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error adding review' });
        }

});

// GET route to view all reviews submitted by a user only if a user is logged in
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

// Update a review for a user
router.put('/update/review/:reviewID', async (req, res) => {
    try {
        const reviewID = req.params.reviewID;
        const userID = req.session.userID;
        const { itemID, stars, reviewText } = req.body;
        const updateReview = await Review.update(
            { stars, reviewText },
            { where: { reviewID: reviewID, userID: userID, itemID: itemID } } 
        );

        res.status(200).render({ message: "Updated review successfully!"})

    } catch (error) {
        console.error(error);
        res.status(500).render({ message: 'Error updating review' });
    };
});

// DELETE api route to remove a previously submitted review in the DB
router.delete('/delete/review/:reviewId', async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const deleteReview = await Review.destroy({
            where: {
                id: reviewId,
                userId: userId // UserId check so user can only delete their own reviews
            }
        });
            res.status(200).json({message: "Review deleted successfully"})

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting review' });
    }
});

module.exports = router;