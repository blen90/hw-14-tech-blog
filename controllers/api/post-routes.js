const router = require('express').Router();
const { Post } = require('../../Models');
// const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try{
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);

  }catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
  const newPost = await Post.update({
    ...req.body,
  });

  res.status(200).json(newPost);
} catch (err) {
  res.status(500).json(err);
}
});

router.delete('/:id', async (req, res) => {
  try{
    const postData = await Post.destroy({
      ...req.body,
    });

    if(!newPost){
      res.status(404).json({message: "No post found with that id!"});

      return;
    }

    res.status(200).json(postData);

  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
