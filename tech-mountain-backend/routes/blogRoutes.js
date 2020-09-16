const express = require('express');
const router = express.Router();
const Blog = require("../models/blogModel");


router.post("/", async (req, res) => {
    const blog = new Blog(req.body);
    await blog.save();
    res.send(blog)
});

router.get("/", (req, res) => {
    Blog.find().populate('writer').exec( (err, blogs)  => {
        if(err) return res.status(400).send(err);
        res.status(200).json({success:true, blogs})
    })
});

router.get("/:id", (req,res) => {
    Blog.findById(req.params.id).exec((err, blog) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({success:true, blog})
    })
})
router.put("/:id", async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, {
        content: req.body.content
    }, { new: true })
    if (!blog)
    return res.status(404).send("The blog with the given ID was not found.");
    
  res.send(blog);
})
router.delete("/:id", async (req, res) => {
    const blog = await Blog.findByIdAndRemove(req.params.id);
    if(!blog) 
        return res.status(404).send("The blog with the given ID was not found.");
    res.send(blog);
})

module.exports = router;