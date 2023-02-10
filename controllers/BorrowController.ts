
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

const addBorrow = async (req :Request, res: any) => {
    BookModel.findById(req.params.id).then((element) => {
        let rendu
        if(!req.body.rendu){
            rendu = null
        }
        else{
            rendu = new Date(req.body.rendu)
        }
        element!.history.push({
            _id : new mongoose.Types.ObjectId(),
            emprunt: new Date(req.body.emprunt),
            rendu: rendu,
            user: req.body.user
        })
        element!.save()
        res.status(200).json("Created!")
    })
}

const updateBorrow = async (req :Request, res: any) => {
    const book = await BookModel.findOne({ _id: req.params.id });

    if (!book) {
        return res.status(404).json({ message: "Le livre n'a pas été trouvé." });
    }

    const latestHistory = book.history[book.history.length - 1];

    if (latestHistory.rendu) {
        return res.status(400).json({ message: "Le livre a déjà été retourné." });
    }

    const result = await BookModel.findOneAndUpdate(
        { _id: req.params.id, "history._id": latestHistory._id },
        { $set: { "history.$.rendu": new Date() }},
        { new: true }
    );

    return res.status(200).json(result);
}


export default {
    addBorrow,
    updateBorrow
}


//Permet d'ajouter un emprunt à un livre

// BorrowModel.findById(req.params.id).then((element) => {
//     element?.history.push(relou)
//     element?.save()
//     res.status(200).json(element)
// })