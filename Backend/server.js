import app from "./src/app.js";
import config from "./src/config/config.js"
import connectToDb from "./src/db/db.js";
import client from "./src/mcp/client.mcp.js"

connectToDb();

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
})