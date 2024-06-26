const ShortUniqueId = require('short-unique-id');
const URL =require('../models/url');
const { model } = require('mongoose');
async function handleGenerateNewShortURL(req,res){
    const uid = new ShortUniqueId({ length: 0 });
    const shortID =uid.rnd()
    const body =req.body;
    if(!body.url) return res.status(400).json({error:'url is required'})
    await URL.create({
        shortID:shortID,
        redirectUrl:body.url,
        visitHistory:[]
    })
    return res.json({id:shortID})


}

module.exports={handleGenerateNewShortURL}