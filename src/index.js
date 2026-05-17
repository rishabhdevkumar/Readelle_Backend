const express = require('express');
const serverConfig = require('./config/server.config');
const connectDB = require('./config/db.config');
const bookRoutes = require("./routes/book.routes");
const userRouter = require("./routes/user.routes");
const categoryRouter = require("./routes/categories.routes");
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}));

app.use(express.json());

app.use("/api/users",userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/books", bookRoutes);


app.get('/ping', (req, res) => {
    res.send('pong');
});

app.listen(serverConfig.PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${serverConfig.PORT}`);
});