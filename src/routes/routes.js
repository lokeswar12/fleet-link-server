import express from 'express';
import {validator} from '../utlis/validatePayload.js';
import { createVehicle } from '../resources/vehicles-details/createVehicle.js';
import  {bookingVehicleValidation, newVehicleSchema}  from "../middleware/validation.js"
import { getVehicleDetails } from '../resources/vehicles-details/getVehicle.js';
import { bookingVehicle } from '../resources/travel-details/bookingVehicle.js';

const router = express.Router();


// Add vehicle
router.post('/vehicles', validator(newVehicleSchema), async (req, res) => {
    try {
        const vehicleData = req.body;
        const newVehicle = await createVehicle(vehicleData);
        res.status(201).json({
            success:true,
            message:" Vehicle Added Successfully",
            data:newVehicle
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
        console.error("Error in create vehicle route")
    }
});

// get all organisation vehicles
router.get("/all/vehicles", async(req, res) => {
    try{
        // const data = req.body
        const vehicleRes = await getVehicleDetails()
        res.status(201).json({
            success:true,
            message: "all vehicles",
            data:vehicleRes
        })
    } catch(error){
        res.status(500).json({ message : "Server Error", error:error.message})
        console.error("Error in get all vehicles route")
    }
})

// vehicle booking
router.post("/bookings", validator(bookingVehicleValidation), async(req, res) => {
    try{

        // checking the ID is there or not
        const {vehicleId, organisationId} = req.body
        if(!vehicleId || !organisationId){
            return res.status(404).json({
                message:"Vehicle Not Found"
            })
        }

        // booking
        const data = req.body
        const bookingDetails = await bookingVehicle(data)

        // insufficient capacity // timeslot conflict
        if(bookingDetails?.message?.includes("Insufficient")){
            return res.status(409).json({
                message:"The vehicle capacity exceeded!"
            })
        } else if(bookingDetails?.message){
            return res.status(409).json({
                message:"The vehicle is already booked for an overlapping time slot"
            })
        } 

        // booking success
        res.status(201).json({
            success:true,
            message:"Booking Created Successfully",
            data:bookingDetails
        })
        
    } catch(error){
        res.status(500).json({
            error:error.message,
            message:"Internal Server Error"
        })
        console.error("Error in booking a vehicle route")
    }
})

// get a vehicle

router.get("/vehicles/available", async(req, res) => {
    try{
        const {capacityRequired, fromPincode, toPincode, startTime} = req?.query

        if(Object?.keys(req?.query)?.length === 0) {
            return res.status(400).json({
                message:"invalid query params"
            })
        }
        const obj = {
            ...(capacityRequired ? {capacity:capacityRequired} : ""),
            ...(fromPincode ? {origin:fromPincode} : ""),
            ...(toPincode ? {destination:toPincode} : ""),
            ...(startTime ? {bookingStartTime:startTime} : "")
        }
        const getDetails = await getVehicleDetails(obj)
        if(!getDetails){
            throw new Error("Error in getting vehicle details")
        }
        res.status(201).json({
            success:true,
            message : "vehicle details retrived successfully",
            data:getDetails
        })
    } catch (error) {
        res.status(500).json({
            error:error.message,
            message:"Internal Server Error"
        })
        console.error("Error in getting vehicle details")
    }
})

export default router;