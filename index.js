const express=require("express")
const app=express()
const mongoose=require("mongoose")
const cors=require("cors")
const dotenv=require("dotenv")
const bodyparser = require("body-parser")
const port = process.env.PORT || 4000
dotenv.config()

mongoose.connect(
    process.env.MONGO_URI,
    // "mongodb://127.0.0.1/aquvarro",
    {useUnifiedTopology:true,useNewUrlParser:true},
    ()=>{
        console.log("mongo Db connected");
    }
)

app.use(express.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

var corsOptions = {
    origin: "*"
  };
  
  app.use(cors(corsOptions));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "*")
    }
    next()
})
app.get("/", (req, res)=>{
    res.send("server is live at 4000")
})



const userRouts=require("./routes/user")
const userPasswordRouts=require("./routes/changepassword")
const authRoute=require("./routes/auth")
const stockRoute=require("./routes/stockRouter")
const teamAllotRoute=require("./routes/teamAllotRout")
const notificationRoute = require("./routes/notification")
const graphRouth=require("./routes/graphRoute")
const stockTechRougth=require("./routes/stockTechRouter")
const leadRoute=require("./routes/lead")
const invoiceRoute=require("./routes/invoice_pdfRouter")
const complaintRoute=require("./routes/complaint")

app.use("/users",userRouts)
app.use("/users/changepassword",userPasswordRouts)
app.use("/invoice",invoiceRoute)
app.use('/teams',teamAllotRoute)
app.use('/notification',notificationRoute)
app.use("/login",authRoute)
app.use("/graph",graphRouth)
app.use('/leads',leadRoute)
app.use('/stock',stockRoute)
app.use('/stocktech',stockTechRougth)
app.use('/complaints',complaintRoute)

app.listen(port,()=>{
    console.log("server started at port 4000");
} )
