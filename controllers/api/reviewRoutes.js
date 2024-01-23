const express = require('express');
const router = express.Router();
const { Review } = require('../../models'); 

// POST route to add a item review to the database only if the user is logged in
router.post('/add/review/:userId', async (req, res) => {
    if (req.session && req.session.userId) {
        try {
            const { itemId, userId, stars, reviewText } = req.body;
            addReview.id = uuidv4(); // generate a unique ID for the review
            const addReview = await Review.create({
                id:uuidv4(), 
                itemId, 
                userId,
                stars, 
                reviewText
            });

            res.status(201).json({ review: addReview, message: 'Review added successfully'});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error adding review' });
        }

    } else {
        // User is not logged in, send an error message
        res.status(401).send('User is not logged in.');
    }
});

// GET route to view all reviews submitted by a user only if a user is logged in
router.get('/view/reviews/:userId', async (req, res) => {
    if (req.session && req.session.userId) {
        try {
            const userId = req.params.userId;
            const viewReviews = await Review.findAll({
                where: { userId: userId } // // Query database for reviews with this userId
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
router.put('/update/review/:reviewId', async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const userId = req.session.userId;
        const { itemId, stars, reviewText } = req.body;
        const updateReview = await Review.update(
            { stars, reviewText },
            { where: { reviewId: reviewId, userId: userId, itemId: itemId } } 
        );

        res.status(204).render({ message: "Updated review successfully!"})

    } catch (error) {
        console.error(error);
        res.status(500).render({ message: 'Error updating review' });
    };
});

// DELETE api route to remove a previously submitted review in the DB
router.delete('/delete/review/:reviewId', async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const deletedReview = await Review.destroy({
            where: {
                id: reviewId,
                userId: userId // UserId check so user can only delete their own reviews
            }
        });
        if (deleteReview) {
            res.status(200).json({message: "Review deleted successfully"})
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting review' });
    }
});

module.exports = router;