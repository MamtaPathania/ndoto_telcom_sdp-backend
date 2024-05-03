const express=require('express');
const getSubscription = require('./subscription.controller');
const router=express.Router();



router.post('/subscription',getSubscription)

module.exports=router