const express = require('express');
const router = express.Router();
const { Review } = require('../../models');

// /api/reviews/

// POST route to add a item review to the database only if the user is logged in
router.post('/add/review', async (req, res) => {
        try {
            const userID = req.session.userID; 
            const { itemID, stars, reviewText } = req.body;
            const addReview = await Review.create({
                itemID,
                stars, 
                reviewText,
                userID
            });

            res.status(201).json({ review: addReview, message: 'Review added successfully'});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error adding review' });
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
                userID: userID // UserId check so user can only delete their own reviews
            }
        });
            res.status(200).json({message: "Review deleted successfully"})

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting review' });
    }
});

module.exports = router;