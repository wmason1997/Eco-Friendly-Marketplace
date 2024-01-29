const express = require('express');
const withAuth = require('../../utils/auth.js')
const router = express.Router();
const { Review } = require('../../models');

// /api/reviews/

router.get('/item/:itemID', async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: {itemID: req.params.itemID},
            raw: true
        })
        res.json(reviews)
    } catch (error) {
        console.log("Failed fetching reviews at /item/:itemID")
        console.log(error)
        res.json({message: 'failure'})
    }
})

// POST route to add a item review to the database only if the user is logged in
router.post('/add/review', withAuth, async (req, res) => {
        try {
            const userID = req.session.userID; 
            const { itemID, stars, reviewText } = req.body;

            // console.log('itemID', itemID)

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


// UPDATE a review for a user
router.put('/update/review/:reviewID', withAuth, async (req, res) => {
    try {
        const reviewID = req.params.reviewID;
        const userID = req.session.userID;
        const { stars, reviewText } = req.body;
        const updateReview = await Review.update(
            { stars, reviewText },
            { where: { id: reviewID, userID: userID } } 
        );

        res.status(200).json({ message: "Updated review successfully!"})

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating review' });
    };
});

// DELETE api route to remove a previously submitted review in the DB
router.delete('/delete/review/:reviewId', withAuth, async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const deleteReview = await Review.destroy({
            where: {
                id: reviewId,
                userID: req.session.userID // UserId check so user can only delete their own reviews
            }
        });
            res.status(200).json({message: "Review deleted successfully"})

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting review' });
    }
});

module.exports = router;