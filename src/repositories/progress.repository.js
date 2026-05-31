
const ReadingProgress = require(
    "../schemas/Progress"
);

const createReadingProgressRepository =
    async (data) => {

        return await ReadingProgress.create(
            data
        );
    };
    

const getBookProgressRepository =
    async (
        userId,
        bookId
    ) => {

        return await ReadingProgress.find({
            user: userId,
            book: bookId,
        })
            .populate(
                "chapter",
                "chapter_title chapter_number"
            )
            .sort({
                created_at: 1,
            });
    };

const updateReadingProgressRepository =
    async (
        progressId,
        userId,
        data
    ) => {

        return await ReadingProgress.findOneAndUpdate(

            {
                _id: progressId,
                user: userId,
            },

            data,

            {
                returnDocument: "after",
            }
        );
    };

module.exports = {
    createReadingProgressRepository,
    getBookProgressRepository,
    updateReadingProgressRepository,
};