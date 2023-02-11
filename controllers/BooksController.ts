
import { Request, Response } from "express"
import { BookModel } from "../Models/Books"

const getBook = async (req:Request, res: Response) => {
    const result = await BookModel.find({})
    res.status(200).json({message : "All Books!",result})
}

const getBookById = async (req:Request, res: Response) => {
    const result = await BookModel.findById(req.params.id)
    res.status(200).json({message : "One book!",result})
}

const addBook = async (req :Request, res: Response) => {
    const result = await BookModel.create(req.body)
    res.status(200).json({message : "Books added!",result})
}
const updateBook = async (req :Request, res: Response) => {
    const result = await BookModel.findOneAndUpdate({title : req.params.title}, req.body)
    res.status(200).json({message : "Books Updated!",result})
}

const deleteBook = async (req :Request, res: Response) => {
    const result = await BookModel.deleteOne({title : req.params.title})
    res.status(200).json({message : "Books added!",result})
}

export default {
    getBook,
    getBookById,
    addBook,
    updateBook,
    deleteBook
}