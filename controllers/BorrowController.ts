
import { Request, Response } from "express"
import mongoose from "mongoose"
import { BookModel } from "../Models/Books"

// const getBorrow = async (req:Request, res: Response) => {
//     const result = await BorrowModel.find({})
//     res.status(200).json(result)
// }

// const getBorrowById = async (req:Request, res: Response) => {
//     const result = await BorrowModel.findById(req.params.id)
//     res.status(200).json(result)
// }

const addBorrow = async (req :Request, res: Response) => {
    BookModel.findById(req.params.id).then((element) => {
        switch (element!.history[element!.history.length - 1].rendu) {
            case null:
                return res.status(400).json({ message: "Le livre a déjà été emprunté." });
            break;
            default:
                element!.history.push({
                    _id : new mongoose.Types.ObjectId(),
                    emprunt: new Date(),
                    rendu: null,
                    user: req.body.user
                })
                element!.save()
                res.status(200).json("Created!")
            break;
        }
    })
}

const updateBorrow = async (req :Request, res: Response) => {

    const book = await BookModel.findById(req.params.id);

    if (book!.history[book!.history.length - 1].rendu !== null && 
        book!.history[book!.history.length - 1].rendu !== undefined) {
        return res.status(400).json({ message: "Book already returned" });
    }
    
    switch (book) {
        
        case undefined:
            return res.status(404).json({ message: "Book does not exist" });
        break;

        case null:
            return res.status(404).json({ message: "Book not found" });
        break;           

        default:
            book.history[book.history.length - 1].rendu = new Date();
            book.location = req.body.location;
            book.save();
        break;
    }

    return res.status(200).json("Book returned!");
}

export default {
    addBorrow,
    updateBorrow
}