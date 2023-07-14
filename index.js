const express = require(`express`);
require("dotenv").config();
const mongooserequiring = require(`./db/mongoose`);
const resrvationRouter = require("./routers/reservation");
const ingredientRouter = require("./routers/ingredient");
const foodItemRouter = require("./routers/foodItem");
const orderRouter = require("./routers/order");
const userRouter = require("./routers/user");
const scheduleRouter = require("./routers/schedule");
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin:true
}))
const port = process.env.PORT;


app.get('/',(req,res)=>{
  res.send('hello');
})

app.use(userRouter);
app.use(resrvationRouter);
app.use(ingredientRouter);
app.use(foodItemRouter);
app.use(orderRouter);
app.use(scheduleRouter);

app.listen(port, () => {
  console.log("Server is up at http://localhost:" + port);
});
