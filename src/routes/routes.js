import express from 'express';
import {validator} from '../utlis/validatePayload.js';
import { createVehicle } from '../resources/vehicles-details/createVehicle.js';
import  {newVehicleSchema}  from "../middleware/validation.js"
import { getVehicleDetails } from '../resources/vehicles-details/getVehicle.js';

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

export default router;