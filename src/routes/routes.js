import express from 'express';
import {validator} from '../utlis/validatePayload.js';
import { createVehicle } from '../resources/vehicles-details/vehicle.js';
import  {newVehicleSchema}  from "../middleware/validation.js"

const router = express.Router();

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
        console.log("Error in create vehicle route")
    }
});

export default router;