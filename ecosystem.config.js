module.exports = {
  apps : [{
    name   : "app1",
    script : "./server/index.js",
    env_production: {
      NODE_ENV: "production"
   }
  }]
}
