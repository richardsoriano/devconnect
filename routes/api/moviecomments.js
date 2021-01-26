const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const MovieComment = require('../../models/MovieComment');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// Movie Comments by ALL  api/moviecomments
// Movie Comments by user api/moviecomments/user/
// Movie Comments by TAGS api/moviecomments/tags/:id
// Movie Comments DELETE



// @route GET api/moviecomments ALL
// @desc Get moviecomments 
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const movieComments = await MovieComment.find(
      {
      }).sort({ date: -1 });
 
    res.json(movieComments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/moviecomments/user/
// @desc Get moviecomments by USERID
// @access Private
router.get('/user', auth, async (req, res) => {
  try {  
    const user = await User.findById(req.user.id).select('-password');
    console.log('user'); 
    console.log(user); 
    const movieComments = await MovieComment.find(
      {
        "user":req.user.id,
      }).sort({ user: -1 });

    res.json(movieComments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/moviecomments/tags/:id
// @desc Get moviecomments by TAGS
// @access Private
router.get('/tags/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const movieComments = await MovieComment.find(
      {
        "tags":req.params.id,
      });

    //console.log(movieComments.likes.length);
    res.json(movieComments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/moviecomments/movie/:id
// @desc Get moviecomments by MOVIES
// @access Private
router.get('/movie/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const movieComments = await MovieComment.find(
      {
        "movie":req.params.id,
      }).sort({ movie: -1 });
   
    res.json(movieComments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//------------------------
// DELETE Comment
// -----------------------
// @route DELETE api/moviecomment/:id
// @desc movie by cid
// @access private
router.delete('/:id', auth, async (req, res) => {
  try {
    const movieComment = await MovieComment.findById(req.params.id);
    if (!movieComment) {
      return res.status(404).json({ msg: 'Movie Comment not found' });
    }
    if (movieComment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await movieComment.remove();
    res.json(movieComment);
  } catch (err) {
    console.log(err.message);
    if (!err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Movie Comment not found' });
    }
    res.status(500).send('Server Error');
  }
});


// @route PUT api/moviecomments/like/:id
// @desc like a movie comment
// @access private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const moviecomment = await MovieComment.findById(req.params.id);

    // Check if the movie comment already has been liked
    if (
      moviecomment.likes.filter((like) => (like.user.toString() === req.user.id)).length >
      0
    ) {
      return res.status(400).json({ msg: 'Movie Comment already liked' });
    }
    moviecomment.likes.unshift({ user: req.user.id });
    moviecomment.save();
    res.json(moviecomment.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT api/moviecomment/unlike/:id
// @desc unlike a moviecomment
// @access private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const moviecomment = await MovieComment.findById(req.params.id);

    // Check if the post already has been liked
    if (
      moviecomment.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post not yet been liked' });
    }

    const removeIndex = moviecomment.likes.map((like) =>
      like.user.toString().indexOf(req.user.id)
    );
    moviecomment.likes.splice(removeIndex, 1);

    moviecomment.save();
    res.json(moviecomment.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});
//===========================
//---- END MOVIE COMMENTS 
// --------------------------

// @route GET api/posts
// @desc Get all posts
// @access Private
// router.get('/', auth, async (req, res) => {
//   try {
//     const posts = await Post.find().sort({ date: -1 });
//     res.json(posts);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route GET api/posts/:id
// @desc Get  posts by id
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (!err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/posts/:id
// @desc posts by pid
// @access private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await post.remove();
    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (!err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route PUT api/posts/like/:id
// @desc like a post
// @access private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post already has been liked
    if (
      post.likes.filter((like) => (like.user.toString() = req.user.id)).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    post.likes.unshift({ user: req.user.id });
    post.save();
    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT api/posts/unlike/:id
// @desc unlike a post
// @access private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post already has been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post not yet been liked' });
    }

    const removeIndex = post.likes.map((like) =>
      like.user.toString().indexOf(req.user.id)
    );
    post.likes.splice(removeIndex, 1);

    post.save();
    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});
// @route COMMENT api/posts/comment/:id
// @desc Create comment
// @access Private
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      // Create
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desc comment by pid
// @access private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Find comment by commentID
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      res.status(404).json({ msg: 'Comment does not exist' });
    }
    // check user only deletes his own comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User is not authorized' });
    }
    const removeIndex = post.comments.map((comment) =>
      comment.user.toString().indexOf(req.user.id)
    );
    post.comments.splice(removeIndex, 1);

    post.save();
    res.json(post.comments);
  } catch (err) {
    console.log(err.message);

    res.status(500).send('Server Error');
  }
});

// @route PUT api/posts/comment/:id/:comment_id
// @desc UPDATE comment by pid
// @access private
router.put('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Find comment by commentID
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      res.status(404).json({ msg: 'Comment does not exist' });
    }

    // check user only updates his own comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User is not authorized' });
    }

    // Create. Comment keeps name, avatar, and user.
    const newComment = {
      text: req.body.text,
      name: comment.name,
      avatar: comment.avatar,
      user: req.user.id,
    };

    const updateIndex = post.comments.map((comment) =>
      comment.user.toString().indexOf(req.user.id)
    );

    post.comments.splice(updateIndex, 1, newComment);

    post.save();
    res.json(post.comments);
  } catch (err) {
    console.log(err.message);

    res.status(500).send('Server Error');
  }
});
module.exports = router;

// @route POST api/moviecomments
// @desc Create a moviecomment
// @access Public
router.post(
  '/', [ auth, 
    check('title', 'Title is required').not().isEmpty(),
    check('body', 'Body is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      console.log("user id");
      console.log(req.user.id);
      const user = await User.findById(req.user.id).select('-password');
      console.log(user);
      console.log('body');
      console.log(req.body);
      const newMovieComment = new MovieComment({
        movie: req.body.movieID,
        user:   req.user.id,
        title:    req.body.title,
        body:     req.body.body,
        tags:     req.body.tags,
      });
      const movie = await newMovieComment.save();
      res.json(movie);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

