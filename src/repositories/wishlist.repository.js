
const Wishlist = require("../schemas/Wishlist");

const toggleWishlistRepository = async (data) => {
    return await Wishlist.create(data);
};

const findWishlistRepository = async (userId, bookId) => {
    return await Wishlist.findOne({
        user: userId,
        book: bookId,
    });
};

const getAllWishlistRepository = async (userId) => {
    return await Wishlist.find({
        user: userId,
    }).populate("book");
};

const updateWishlistRepository = async (wishlistId, data) => {
    return await Wishlist.findByIdAndUpdate(
        wishlistId,
        data,
        {
            returnDocument: "after",
            runValidators: true,
        }
    );
};

const deleteWishlistRepository = async (wishlistId) => {
    return await Wishlist.findByIdAndDelete(wishlistId);
};

module.exports = {
    toggleWishlistRepository,
    findWishlistRepository,
    deleteWishlistRepository,
    getAllWishlistRepository,
    updateWishlistRepository,
};