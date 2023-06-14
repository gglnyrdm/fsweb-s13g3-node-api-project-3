const express = require('express');
const usersModel = require('./users-model');
const postsModel = require('../posts/posts-model');
// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir
const middleware = require('../middleware/middleware');

const router = express.Router();

router.get('/', async (req, res,next) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
  try {
    let allUsers = await usersModel.get();
    res.json(allUsers);
  } catch (error) {
      next(error);
  }
});

router.get('/:id',middleware.validateUserId, (req, res, next) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir
  try {
    res.json(req.currentUser);
  } catch (error) {
    next(error);
  }
});

router.post('/',middleware.validateUser,async (req, res, next) => {
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.
  try {
    const insertedUser = await usersModel.insert({name:req.body.name});
    res.status(201).json(insertedUser);
  } catch (error) {
    next(error);
  }
});

router.put('/:id',middleware.validateUserId,middleware.validateUser,async (req, res, next) => {
  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan ara yazılım gereklidir
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  try {
    const updatedUser = await usersModel.update(req.params.id,{name:req.body.name});
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',middleware.validateUserId,async (req, res, next) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    await usersModel.remove(req.params.id);
    res.json(req.currentUser);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/posts',middleware.validateUserId,async (req, res, next) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    const userPosts = await usersModel.getUserPosts(req.params.id);
    res.json(userPosts);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/posts',middleware.validateUserId,middleware.validatePost,async (req, res,next) => {
  // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  try {
    let insertedPost = await postsModel.insert({user_id:req.params.id,text:req.body.text});
    res.status(201).json(insertedPost);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
// routerı dışa aktarmayı unutmayın
