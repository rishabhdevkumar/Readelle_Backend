
const {
    toggleWishlistRepository,
    findWishlistRepository,
    deleteWishlistRepository,
    getAllWishlistRepository,
    updateWishlistRepository,
} = require("../repositories/wishlist.repository");

const {
    findBookByIdRepository,
} = require("../repositories/book.repository");

const toggleWishlistService = async (userId, data) => {

    // Check book exists
    const book = await findBookByIdRepository(data.book);

    if (!book) {
        throw new Error("Book not found");
    }

    const existingWishlist = await findWishlistRepository(
        userId,
        data.book
    );

    if (existingWishlist) {

        await deleteWishlistRepository(existingWishlist._id);

        return {
            statusCode: 200,
            message: "Book removed from wishlist",
            data: {},
        };
    }

    const wishlist = await toggleWishlistRepository({
        user: userId,
        book: data.book,
    });

    return {
        statusCode: 201,
        message: "Book added to wishlist",
        data: wishlist,
    };
};

const getAllWishlistService = async (userId) => {
    return await getAllWishlistRepository(userId);
};

const updateWishlistService = async (wishlistId, data) => {

    const updatedWishlist = await updateWishlistRepository(
        wishlistId,
        data
    );

    if (!updatedWishlist) {
        throw new Error("Wishlist item not found");
    }

    return {
        message: "Wishlist updated successfully",
        data: updatedWishlist,
    };
};

const deleteWishlistByIdService = async (wishlistId) => {

    const deletedWishlist = await deleteWishlistRepository(
        wishlistId
    );

    if (!deletedWishlist) {
        throw new Error("Wishlist item not found");
    }

    return {
        message: "Wishlist item deleted successfully",
        data: {},
    };
};

module.exports = {
    toggleWishlistService,
    getAllWishlistService,
    updateWishlistService,
    deleteWishlistByIdService,
};