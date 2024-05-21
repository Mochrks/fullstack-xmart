const { createClient } = require("redis");

const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_DB = process.env.REDIS_DB || 0;

const redisClient = createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  db: REDIS_DB,
  tls: false,
});

redisClient.connect().catch(console.error);

redisClient.on("connect", function () {
  console.log("Connection to RedisClient has been established successfully");
});

redisClient.on("error", function (err) {
  console.log("Error connecting to Redis:", err);
});

module.exports = redisClient;
