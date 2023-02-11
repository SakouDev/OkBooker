
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
        let rendu
        if(!req.body.rendu){
            rendu = null
        }
        else{
            return res.status(400).json({ message: "Le livre a déjà été rendu." });
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

const updateBorrow = async (req :Request, res: Response) => {

    const book = await BookModel.findById(req.params.id);
    
    switch (book) {
        
        case undefined:
            return res.status(404).json({ message: "Le livre n'a pas été trouvé." });
        break;

        case null:
            return res.status(404).json({ message: "Le livre n'a pas été trouvé." });
        break;

        default:
            book.history[book.history.length - 1].rendu = new Date();
            book.location = req.body.location;
            book.save();
        break;

    }

    return res.status(200).json("Updated!");

    // const result = await BookModel.findOneAndUpdate(
    //     { _id: req.params.id, "history._id": latestHistory._id },
    //     { $set: { "history.$.rendu": new Date() }},
    //     { new: true }
    // );

}

export default {
    addBorrow,
    updateBorrow
}