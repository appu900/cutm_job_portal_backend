import App from "../expressApp";
const PORT = 5000;

async function StartServer() {
  App.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
}

export default StartServer;
