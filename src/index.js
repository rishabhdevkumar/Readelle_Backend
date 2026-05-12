const express = require('express');
const serverConfig = require('./config/server.config');
const connectDB = require('./config/db.config');
const bookRoutes = require("./routes/book.routes");
const userRouter = require("./routes/user.routes");

const app = express();


app.use(express.json());

app.use("/api/users",userRouter);
app.use("/api/books", bookRoutes);


app.get('/ping', (req, res) => {
    res.send('pong');
});

app.listen(serverConfig.PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${serverConfig.PORT}`);
});