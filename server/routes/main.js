const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
/*
Get method 


*/
router.get("", async (req, res) => {
  try {
    const locals = {
      title: "Node js Blog",
      description: "simple blog created with Node.js, Express and mongoDB",
    };

    let perPage = 3;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    //const data = await Post.find();
    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      curentRoute: "/",
    });
  } catch (error) {
    console.log(error);
  }
});

//insertPostData();
router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "simple blog created with Node.js, Express and mongoDB",
      curentRoute: `/post/$(slug)`,
    };
    res.render("post", {
      locals,
      data,
      curentRoute: "/",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  res.render("about", { curentRoute: "/about" });
});

router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "simple blog created with Node.js, Express and mongoDB",
    };
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/["a-zA-Z0-9]/g, "");
    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    console.log(searchTerm);

    res.render("search", {
      data,
      locals,
      // searchTerm,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

/*
function insertPostData() {
  Post.insertMany([
    {
      title: " Building A Blog",
      body: " This is the Body text 2",
    },
    {
      title: " Building A Blog",
      body: " This is the Body text 3",
    },
    {
      title: " Building A Blog",
      body: " This is the Body text 4",
    },
    {
      title: " Building A Blog",
      body: " This is the Body text 5 ",
    },
    {
      title: " Building A Blog",
      body: " This is the Body text 6",
    },
    {
      title: " Building A Blog",
      body: " This is the Body text 7",
    }, 
    {
      title: " Building A Blog",
      body: " This is the Body text 8",
    },
  ]);
}*/
