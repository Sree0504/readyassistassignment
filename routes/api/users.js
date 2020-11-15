const express = require("express");
const router = express.Router();
const User = require("../../models/users");
const {check, validationResult} = require("express-validator");
const mongoose = require('mongoose');
// @route POST /api/users
// @desc add/update user
// @access public
router.post("/",
  [ [check("userName", "User name is required").not().isEmpty()],
		[check("firstName", "First name is required").not().isEmpty()]
	],
  async (req, res, next) => {
		const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }
		const {id, userName, firstName, lastName, isActive} = req.body;
		const userData = {};
		userData.userName = userName;
		userData.firstName = firstName;
		userData.isActive = isActive || true;
		if(lastName) userData.lastName = lastName;
    try {
			let user={};
      if (id) {
         user = await User.findOneAndUpdate(
          {_id: id},
          {$set: userData},
          {new: true}
        )
        return res.json(user);
      }
			// check userName exists
			const userExists = await User.find({userName: userName},{_id:1}).limit(1);
			if(Boolean(userExists.length)) {
				return res.status(400).send('userName exists!')
			}
       user = new User(userData);
			 await user.save();
			 res.json(user);
    } catch(error) {
			res.status(500).send(`${error.message} Server error`);
    }
  }
);

// @route 						GET /api/users
// @description       get all users
// @access 						public
router.get("/",  async (req, res) => {
  	try {
			const {p="0", r="10"} = req.query;
			page = parseInt(p)+1;
			pageCount = parseInt(r);
    	const users = await User.find().skip((page-1) * pageCount).limit(pageCount).sort({createdAt: -1});
			const total = await User.find().countDocuments(true);
    	res.json({users:users, totalCount: total});
  	} catch (err) {
    	console.error(err.message)
    	res.status(500).send("Server error")
  }
})

// @route 						GET /api/users/:id
// @description       get user by ID
// @access 						public
router.get("/:id", async (req, res) => {
	const {id} = req.params;
		if(!id.match(/^[0-9a-fA-F]{24}$/)){
			return res.status(404).send('wrong parameter passed');
		}
  try {
    const user = await User.findById(id)
    if (!user) {
      res.status(404).json({msg: "User not found"})
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(500).send("Server error")
  }
})

// @route 						DELETE /api/users/:id
// @description       delete a user
// @access 						public
router.delete("/:id",  async (req, res, next) => {
	const {id} = req.params;
		if(!id.match(/^[0-9a-fA-F]{24}$/)){
			return res.status(404).send('wrong parameter passed through url');
		}
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({msg: "user not found"})
    }
    const removeUser = await User.findOneAndUpdate({_id: id}, {$set:{isActive: false}});
    res.status(200).json({msg: `User removed`})
  } catch (err) {
    console.error(err.message)
    res.status(500).json({msg:"Server error"});
	}
});

module.exports = router;