
import { Request, Response } from "express"
import { BookModel } from "../Models/Books"

const getBook = async (req:Request, res: Response) => {
    const result = await BookModel.find({})
    res.status(200).json(result)
}

const getBookById = async (req:Request, res: Response) => {
    const result = await BookModel.findById(req.params.id)
    res.status(200).json(result)
}

const addBook = async (req :Request, res: any) => {
    BookModel.create(req.body).then(res.send("Books added!"))
}
const updateBook = async (req :Request, res: any) => {
    BookModel.findOneAndUpdate({title : req.params.title}, req.body).then(res.send("Book updated!"))
}

const deleteBook = async (req :Request, res: any) => {
    BookModel.deleteOne({title : req.params.title}).then(res.send("Book deleted!"))
}

export default {
    getBook,
    getBookById,
    addBook,
    updateBook,
    deleteBook
}


//Permet d'ajouter un emprunt à un livre

// BookModel.findById(req.params.id).then((element) => {
//     element?.history.push(relou)
//     element?.save()
//     res.status(200).json(element)
// })