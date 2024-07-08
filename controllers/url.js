const ShortUniqueId = require('short-unique-id');
const URL =require('../models/url');
const { model } = require('mongoose');
async function handleGenerateNewShortURL(req,res){
    const uid = new ShortUniqueId({ length: 8 });
    const shortID =uid.rnd()
    const body =req.body;
    if(!body.url) return res.status(400).json({error:'url is required'})
    await URL.create({
        shortID:shortID,
        redirectUrl:body.url,
        visitHistory:[]
    })
    return res.json({id:shortID})



};
async function handleSingleUrl(req, res){
    const shortID = req.params.shortID
    console.log('shortID: ' + shortID)
   const entry = await URL.findOneAndUpdate({shortID:shortID},{$push:{visitHistory:{timestamp:Date.now()}}});

   res.redirect(entry.redirectUrl)

};
async function handleAnalytictsUrl(req,res){
    const shortID = req.params.shortID
    const result = await URL.findOne({shortID})
    return res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory})
 
}


module.exports={handleGenerateNewShortURL,handleSingleUrl,handleAnalytictsUrl}