import mongoose from "mongoose";

const organisationSchema = new mongoose.Schema({
    companyName:{type:String, required:true},
    companyEmail:{trype:String},
    contactNo:{type:Number},
    address:{type:String},
    name:{type:String},
    email:{type:String, required:true},
    password:{type:String},
    role:{type:String, default:"user"}
}, {timestamps:true})

// const userSchema = new mongoose.Schema({
//     organisationId:{type:mongoose.Schema.Types.ObjectId, ref:"organisationSchema"},
// }, {timestamps:true})

const vehicleSchema = new mongoose.Schema({
    organisationId:{type:mongoose.Schema.Types.ObjectId, ref:"organisationSchema"},
    vehicleNo:{type:String, required:true, unique:true},
    type:{type:String, enum:["truck", "bus", "van"]},
    vehicleCapacity:{
        weight:{type:Number},
        tyres:{type:Number}
    },
    vehicleStatus:{type:String, enum:["active", "inactive", "maintenance"], default:"active"},
    availabilityStatus:{type:String, enum:["available", "partiallyBooked", "unavailable"], default:"available"},
    vehicleStartTime:{type:String},
    vehicleEndTime:{type:String},
    booking:[{
        bookingtatus:{type:String, enum:["confirmed", "completed", "cancelled"]},
        customerName:{type:String},
        route:{
            origin:{type:String},
            destination:{type:String},
        },
        bookingStartTime:{type:String},
        bookingEndTime:{type:String},
        bookingCapacity:{
            weight:{type:Number},
            passengers:{type:Number}
        },
    }]
}, {timestamps:true})

export const Organisation = mongoose.model("Organisation", organisationSchema)
// export const User = mongoose.model("User", userSchema)
export const Vehicle = mongoose.model("Vehicle", vehicleSchema)