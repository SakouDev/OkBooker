
import axios from "axios"
import { Request, Response } from "express"

const loginAdmin = async (req:Request, res: Response) => {
    const result = await axios.get('http://141.94.247.187:3000/api/v1/list').then((response) => {
        return response.data
    })
    const {name, code} = req.body

    const data = result.filter((item:any) => {
        return item.code === code && item.name === name
    })

    console.log(data)
    
    if(data.length > 0) {
        if(data[0].admin) {
            res.status(200).json({message : "Logged In", data})
        }else {
            res.status(401).json({message : "Wrong Credentials"})
        }
    } else {
        res.status(401).json({message : "Wrong Credentials"})
    }
    

}

const loginQR = async (req:Request, res: Response) => {
    const result = await axios.get('http://141.94.247.187:3000/api/v1/list').then((response) => {
        return response.data
    })
    const {name, code} = req.body

    const data = result.filter((item:any) => {
        return item.code === code
    })

    console.log(data)
    
    if(data.length > 0) {
        res.status(200).json({message : "Logged In", data})
    } else {
        res.status(401).json({message : "Wrong Credentials"})
    }
    

}

export default {
    loginAdmin,
    loginQR
}