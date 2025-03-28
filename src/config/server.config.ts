import App from "../expressApp";
import { addEmailJob } from "../utils/queue/queue";
import { checkDatabaseConnection } from "./database.config";
import { connectToRedis } from "./redis.config";
const PORT = 5000;

async function StartServer() {
  await checkDatabaseConnection();
  App.listen(PORT, async () => {
    // addEmailJob("pabitradakua85@gmail.com","hello helloo","this is me ")
    console.log(`server started on port ${PORT}`);
  });
}

export default StartServer;
