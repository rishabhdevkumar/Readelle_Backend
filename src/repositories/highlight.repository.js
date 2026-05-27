const Highlight = require('../schemas/Highlight');

exports.createHighlightRepository = async (highlightData) => {
    const highlight = new Highlight(highlightData);
    return await highlight.save();
}

exports.getHighlightByChapterIdRepository = async (highlightData) => {
    return await Highlight.find({
        user: highlightData.user,
        book: highlightData.book,
        chapter: highlightData.chapter,
    }).populate('book').populate('chapter');
}

exports.deleteHighlightRepository = async (highlightId, userId) => {
    const deletedHighlight = await Highlight.findOneAndDelete({ _id: highlightId, user: userId });
    return deletedHighlight;
}