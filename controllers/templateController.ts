import { wowTemplate } from "../types/template"

import { ErrorRequestHandler, Request, Response } from "express"
import { BadRequestException, NotFoundException } from "../middleware/exception"
import { BookModel } from "../database/database"

const db = require("../database/connect")
const queries = require("../queries/templateQueries")

const getTemplate = async (req:Request, res: Response) => {
    const result = await BookModel.find({})
    res.status(200).json(result)
}

const getTemplateById = async (req:Request, res: Response) => {
    const result = await BookModel.findOne({title : req.params.title})
    res.status(200).json(result)
}

const addTemplate = async (req :Request, res: Response) => {
    await BookModel.create(req.body)
}

const updateTemplate = async (req :Request, res: Response) => {
    let result = await BookModel.findOne({title : req.params.title})
    try {
        if (!result) throw new NotFoundException("Impossible de mettre à jour un ID inexistant")
        await BookModel.updateOne({title : req.params.title}, req.body)
    } catch (error) {
        
    }
}

const deleteTemplate = (req :Request, res: Response) => {

    const id = parseInt(req.params.id)

    db.query(queries.getTemplateById, [id], (error:ErrorRequestHandler, result:any) => {

        try {
            if(!Number.isInteger(id)) throw new BadRequestException("ID non trouvé")
            const noTemplateFound = !result.rows.length
            if(noTemplateFound) throw new NotFoundException("Impossible de supprimé un ID inexistant")
            
            // Delete the templates
            db.query(queries.deleteTemplate, [id], (error:ErrorRequestHandler, result:any) =>{
                if (error) throw error
                res.status(200).send("templates Deleted.. CHEH!")
            })
        } catch (error) {
            res.send(error)
        }
    })
}

module.exports = {
    getTemplate,
    getTemplateById,
    addTemplate,
    updateTemplate,
    deleteTemplate
}