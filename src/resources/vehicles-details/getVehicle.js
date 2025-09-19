import { Vehicle } from "../schema/model.js";

export const getVehicleDetails = async (data) => {
    try{
        const vehicles = await Vehicle.find()
        return vehicles
    } catch(error){
        console.error("Error in getting the vehicle details")
    }
}