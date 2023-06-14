const usersModel = require("../users/users-model");

function logger(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  let reqMethod= "";
  let reqUrl= "";
  let timestamp = new Date().toLocaleString();
  console.log(`${timestamp} - ${reqMethod} - ${reqUrl}`);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const existUser = await usersModel.getById(req.params.id);
    if (!existUser) {
      res.status(404).json({ message: "user not found" });
    } else {
      req.currentUser = existUser;
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function  validateUser (req, res, next)  {
  // SİHRİNİZİ GÖRELİM
 try {
  let {name} = req.body;
  if(!name){
    res.status(400).json({message:"gerekli name alanı eksik"});
  }else {
    next();
  }
 } catch (error) {
    next(error);
 }
 
}

function validatePost(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {
    let text = req.body.text;
    if(!text) {
      res.status(400).json({message:"gerekli text alanı eksik"});
    }else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {logger,
   validateUserId, 
   validateUser, 
   validatePost,
  }
// bu işlevleri diğer modüllere değdirmeyi unutmayın
