const router = require('express').Router();
const { User, Post } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        //Get all the post and join with user data
        const postData = await Post.findAll({
            attibutes: ['created-at', 'id', 'title', 'content'],
            include: [{ 
                model: User, 
                attributes: ['userName'],

                model: Comment, 
                attributes: ['created_at', 'id', 'comment', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['userName']
                }
            }],
        })
        // .then(postData => res.json(postData))
        // .catch(err => {
        //     console.log(err);
        //     res.status(500).json(err);
        // })
// Serialize data so the template can read it
const posts = postData.map((post) => post.get({ plain: true }));

// Pass serialized data and session flag into template
res.render('all-posts', { 
  posts, 
  logged_in: req.session.logged_in 
});
} catch (err) {
res.status(500).json(err);
}
});

module.exports = router;