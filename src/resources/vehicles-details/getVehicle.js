import { Vehicle } from "../schema/model.js";

export const getVehicleDetails = async (data) => {
    try{
        if(Object.keys(data)?.length === 0){
            const vehicles = await Vehicle.find()
            return vehicles
        }

        // building query
        const query = {}
        if(data?.capacity){
            query["vehicleCapacity.weight"] = { $gte: parseInt(data?.capacity, 10) }
        }

        // getting active vehicles
        query.vehicleStatus = "active"

        let estimatedTime = "", startTime = '', endTime = ""

        if(data?.origin && data?.destination){
            estimatedTime =  Math.abs(parseInt(data?.destination) - parseInt(data?.origin)) % 24;

            if(data?.bookingStartTime){
                startTime = new Date(data?.bookingStartTime)
                endTime = new Date(startTime)
                endTime.setHours(endTime?.getHours() + estimatedTime)
            }
        }
    
        // get vehicles
        const activeVehicles = await Vehicle?.find(query)
        let availbleVehicles = activeVehicles
        if(startTime && endTime){
            availbleVehicles = activeVehicles?.filter((vehicle) => {
                const overlap = vehicle?.booking?.some((booking) => {
                    const start1 = new Date(booking?.bookingStartTime)
                    const end1 = new Date(booking?.bookingEndTime)
                    return startTime < end1 && start1 < endTime
                })
                return !overlap
            })
        }

        return availbleVehicles


    } catch(error){
        console.error("Error in getting the vehicle details")
    }
}
