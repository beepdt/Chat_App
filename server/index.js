import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import postRoute from "./routes/posts.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";
import User from "./models/user.js";
import Post from "./models/post.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
//console.log("CLIENT_URL:", process.env.CLIENT_URL);

const app = express();
app.use(express.json());


app.use(cors({
  origin: [process.env.ORIGIN],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials:true,
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"],
}));

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded ({limit: "30mb", extended: true}));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(morgan("common"));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


/*FILE STORAGE MULTER */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb)  {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/*ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts",verifyToken, upload.single("picture"), createPost);

/*ROUTES */
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);

/*DATABASE CONNECTION */
const PORT = process.env.PORT || 6000;
mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
 }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
 }).catch((error) => {
    console.log(`Did not connect ${error}`);    
 });