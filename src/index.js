const express = require('express');
const serverConfig = require('./config/server.config');
const connectDB = require('./config/db.config');

const app = express();

app.use(express.json());

app.get('/ping', (req, res) => {
    res.send('pong');
});


const userRouter = require("./routes/user.routes");
app.use("/api/users",userRouter);



app.listen(serverConfig.PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${serverConfig.PORT}`);
});