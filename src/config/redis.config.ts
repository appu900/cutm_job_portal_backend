import redis from "redis";
const client = redis.createClient({ url: "redis://localhost:6379" });

export async function connectToRedis() {
  try {
    await client.ping();
    console.log("Redis connected successfully");
  } catch (error) {
    console.log("error in connectToRedis", error);
    process.exit(1);
  }
}
// client.connect().then(() => console.log('Redis connected')).catch(err => console.error(err));
