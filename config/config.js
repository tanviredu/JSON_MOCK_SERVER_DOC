module.exports = {
    "mongourl": "mongodb+srv://trahman123456:trahman123456@cluster0.v1x5w.mongodb.net/todo?retryWrites=true&w=majority",
    "redisurl":"redis-12777.c232.us-east-1-2.ec2.cloud.redislabs.com",
    "redisport":12777,
    "port": process.env.PORT || 3000,
    "password":"passwordTanvir123",
    "secrets": process.env.JWT || "secret",
    "expiretime": 24 * 60 * 10
}