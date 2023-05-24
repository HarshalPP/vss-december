const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productionSchema = new Schema({
  purchaseId:String,
  orderdate:String,
  arrivedate:String,
  clientName:String,
  firmName:String,
  address:String,
  city:String,
  phone_no:Number,
  note: String,
  company: String,
  grade :String,
  topcolor:String,
  coatingnum:Number,
  temper:String,
  guardfilm:String,
  thickness: Number,
  width : Number,
  length:Number,
  pcs: Number,
  weight:Number,
  product: Number,
  batch_number:String,
  ready_production:String,
  vehical_no:String,
  vendor:String,
  production_incharge_name:String,
  assign_date:String,
  thickness_selected:String,
  width_selected:String,
  color_selected:String,
  company_name_selected:String,
  completion_date:String,
  batch_assign:String ,
  approx_length_in_batch:Number,
  approx_weight_per_mm:Number,
  pcs_cut:Number,
  length_per_pcs_cut:Number,
  total_length_cut:'mixed',
  approx_weight_cut:'mixed',
  density:'mixed',   
  select_product:String           

},{
  toObject: { virtuals: true },
  toJSON: { virtuals: true }

});
          const Production_incharge = mongoose.model("productionSchema", productionSchema);

          module.exports = Production_incharge; 


