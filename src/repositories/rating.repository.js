const Rating = require("../schemas/Rating");

exports.createRating =async(data)=>{
    return await Rating.create(data);
};

exports.findUserRating=async(bookId,userId)=>{
    return await Rating.findOne({bookId,userId});
};

exports.updateRating=async(id,rating)=>{
    return await Rating.findByIdAndUpdate(
        id,
        {rating},
        {new:true}
    );
};

exports.getRatings = async(bookId)=>{
    return await Rating.find({bookId})
};