import joi from 'joi'

export const newVehicleSchema = joi.object({
    vehicleNo: joi.string().required(),
    type: joi.string().valid("truck", "bus", "van").required(),
    vehicleCapacity: joi.object({
        weight: joi.number().required(),
        tyres: joi.number().required()
    }).required(),
    vehicleStatus: joi.string().valid("active", "inactive", "maintenance").default("active"),
    organisationId: joi.string().required(),
    availabilityStatus: joi.string().valid("available", "partiallyBooked", "unavailable").default("available"),
    vehicleStartTime: joi.string().required(),
    vehicleEndTime: joi.string().required()
})