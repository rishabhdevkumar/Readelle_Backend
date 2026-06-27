const ratingRepo = require("../repositories/rating.repository");


exports.addRating= async (bookId,userId,rating) => {

  const existingRating = await ratingRepo.findUserRating(
    bookId,
    userId
  );

  if (existingRating) {
    return await ratingRepo.updateRating(
      existingRating._id,
      rating
    );
  }

  return await ratingRepo.createRating({
    bookId,
    userId,
    rating,
  });
};

exports.getRating = async (bookId,userId) => {
  const ratings = await ratingRepo.getRatings(bookId);

  const userRating = await ratingRepo.findUserRating(bookId,userId);

  if (!ratings.length) {
    return {
      averageRating: 0,
      totalRatings: 0,
      userRating:null
    };
  }

  const total = ratings.reduce(
    (sum, item) => sum + item.rating,
    0
  );

  return {
    averageRating:
      total / ratings.length,
    totalRatings: ratings.length,
    userRating
  };
};

exports.updateRating = async(id,rating)=>{

  return await ratingRepo.updateRating(id,rating);
};