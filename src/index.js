const express = require('express');
const serverConfig = require('./config/server.config');
const connectDB = require('./config/db.config');
const bookRoutes = require("./routes/book.routes");
const userRouter = require("./routes/user.routes");
const categoryRouter = require("./routes/category.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const chapterRouter = require("./routes/chapter.router");
const cors = require("cors");
const cartRouter = require("./routes/cart.routes");

const app = express();

app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/books", bookRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart",cartRouter);
app.use("/api/chapters", chapterRouter);


app.get('/ping', (req, res) => {
    res.send('pong');
});

app.listen(serverConfig.PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${serverConfig.PORT}`);
});