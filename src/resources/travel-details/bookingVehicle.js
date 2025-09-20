import { Vehicle } from "../schema/model.js";
import {ObjectId} from "mongodb"

function isOverlapping(start1, end1, start2, end2) {
  return start1 < end2 && start2 < end1;
}
// booking vehicle

export const bookingVehicle = async (data) => {
    try{
        // get vehicle details
        const vehicleId = data?.vehicleId
        const getVehicleDetails = await Vehicle.findById({
            _id:vehicleId,
        })

        if (!getVehicleDetails) {
            throw new Error("Vehicle not found");
        }

        const vehicleDetails = getVehicleDetails?._doc || {}
        console.log("vehicleDetails", vehicleDetails)
        
        if(Object.keys(vehicleDetails)?.length > 0){
            const balanceVehicleCapacity = vehicleDetails?.vehicleCapacity?.weight - data?.bookingCapacity?.weight
            if (!balanceVehicleCapacity) {
                return {message:"Insufficient vehicle capacity"}
            }
            // Calculate estimated ride duration (placeholder logic)
            const estimatedRideDurationHours = Math.abs(parseInt(data.route.destination) - parseInt(data.route.origin)) % 24;

            const bookingStartTime = new Date(data.bookingStartTime);
            const bookingEndTime = new Date(bookingStartTime);
            bookingEndTime.setHours(bookingEndTime.getHours() + estimatedRideDurationHours);
            const endTime = bookingEndTime

            // checking the time overlap for booking

            const overlapping = vehicleDetails?.booking?.some((details) => (
                isOverlapping(
                    bookingStartTime,
                    bookingEndTime,
                    new Date(details?.bookingStartTime),
                    new Date(details?.bookingEndTime)
                )
            ))

            if(overlapping){
                return {"message":overlapping}
            }

            const bookingObj = {
                "_id": new ObjectId(),
                bookingtatus: "confirmed",
                customerName: data?.customerName,
                route:{
                    origin: data?.route?.origin,
                    destination: data?.route?.destination,
                },
                bookingStartTime: bookingStartTime?.toISOString(),
                bookingEndTime: endTime?.toISOString(),
                bookingCapacity:{
                    weight:data?.bookingCapacity?.weight
                },
            }
            let bookingDetails = await Vehicle.findByIdAndUpdate(vehicleDetails?._id, {
                vehicleCapacity: balanceVehicleCapacity,
                booking:[...vehicleDetails?.booking, bookingObj]
            }, {new:true})
            
            console.log("bookingDetails", bookingDetails)
            return bookingDetails
        }


    } catch(error) {
        throw new Error("")
        console.error("Error in booking vehicle", error.message)
    }
}