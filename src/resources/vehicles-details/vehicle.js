import {Vehicle} from "../schema/model.js"

export const createVehicle = async(data) => {
    try {
        const newVehicle = new Vehicle(data)
        await newVehicle.save()
        return newVehicle
    } catch (error){
        console.log("Error in creating vehicle:", error)
    }
}