import { Organisation } from "../schema/model.js"
import bcrypt from "bcryptjs";

export const createOrg = async (data) => {
    try{
        // check user Exisist
        const existUser = await Organisation.findOne({ companyEmail:data?.companyEmail })
        if (existUser) {
            return res.status(200).json({ message: "Organisation Already Exisits" })
        }
    
        // hasing the password
        const hashedPassword = await bcrypt.hash(data?.password, 10)
        const newOrg = new Organisation ({ ...data, password: hashedPassword })
        await newOrg.save()
        delete newOrg?.password
        return newOrg
    } catch (error){
        console.error("Error in creating organisation details", error.message)
    }
}