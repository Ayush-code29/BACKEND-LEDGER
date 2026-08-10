import "dotenv/config";
import app from "./app.js";
import connectdb from "./config/db.js";

const PORT = 3000;

connectdb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error);
    });