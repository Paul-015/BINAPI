const express = require("express");
const userRouter = require("./routes/users");

const app = express();

app.get('/', (request, reponse , next) => {
    reponse.send('Hello ');

})


app.use(userRouter);


app.listen(process.env.PORT || 3000, () => {
    console.log("Server listening on port " + (process.env.PORT || 3000));
});
