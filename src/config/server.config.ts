import App from "../expressApp";
import { checkDatabaseConnection } from "./database.config";
const PORT = 5000;

async function StartServer() {
  await checkDatabaseConnection();
  App.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
}

export default StartServer;
