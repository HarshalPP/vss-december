const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var currentDate = new Date();
var timestamp = currentDate.getTime();
const productionHead = new Schema({
  _cId:{
    type:ObjectId,
    required:true
  },
  oId:{
    type:String,
    required:true
  },
  productionincharge:
    {
      type:String,
      required:true
    },
    deliveryDate:
   {
     type:String,
     required:true
   },
    completionDate:
   {
     type:String,
     required:true
   }      
});
const Production_head = mongoose.model("productionhead", productionHead);
module.exports = Production_head;