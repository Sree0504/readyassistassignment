const mongoose = require('mongoose');

module.exports = UserSchema = new mongoose.Schema(
	{ 
	userName:{type: String, required: true, unique: true, immutable: true},
	firstName:{ type: String, required: true },
	lastName:{ type: String},
	isActive:{ type: Boolean, default: true }
	},
	{ timestamps: true },
	{ versionKey: false }
);

// UserSchema.pre('save', true, function(next, done){
// 	let now = new Date();
//   this.updatedAt = now;
//   if (!this.createdAt) {
//     this.createdAt = now;
// 		done();
//   }
// 	next();
// });
