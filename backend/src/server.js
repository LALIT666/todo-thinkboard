import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connnectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//middleware

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json()); //this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

//our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
connnectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server started on PORT: ${PORT}`);
  });
});

//What is an Endpoint?
//An endpoint is. combination of a URL + HTTP method that lets the client interact with a specific resource

// app.get("/api/notes", (req, res) => {
//   res.status(200).send("you got 20s notes");
// });

// app.post("/api/notes", (req, res) => {
//   res.status(201).json({ message: "NOTE created successfully!" });
// });

// app.put("/api/notes/:id", (req, res) => {
//   res.status(200).json({ message: "NOTE updated successfully!" });
// });

// app.delete("/api/notes/:id", (req, res) => {
//   res.status(200).json({ message: "NOTE deleted successfully!" });
// });
