const rateLimit = require("express-rate-limit");

const authLimit = rateLimit({
    windowMs:5*60*1000, // for 5 minutes/2
    max:5,
    message:{
        message :"Too many attempts. Try After Some Time"
    },
  standardHeaders: true,
  legacyHeaders: false
});
module.exports = authLimit;