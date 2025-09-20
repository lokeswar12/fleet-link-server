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

export const bookingVehicleValidation = joi.object({
    vehicleId:joi.string().required(),
    organisationId:joi.string().required(),
    customerName:joi.string().required(),
    route:joi.object({
        origin:joi.string().required(),
        destination:joi.string().required()
    }).required(),
    bookingStartTime:joi.string(),
    bookingCapacity:joi.object({
        weight:joi.number().required()
    })
})

export const userValidation = joi.object({
    companyName:joi.string().required(),
    companyEmail:joi.string().required(),
    contactNo:joi.number().required(),
    address:joi.string().required(),
    name:joi.string().required(),
    email:joi.string().optional(""),
    password:joi.string().required(),
    role:joi.string().required()
})