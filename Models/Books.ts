import mongoose from "mongoose";

const HistoryShema = new mongoose.Schema(
    {
        _id : {
            type : mongoose.Schema.Types.ObjectId,
            unique: true,
            default: () => new mongoose.Types.ObjectId()
        }, 
        emprunt : {
            type : Date,
            required : true
        }, 
        rendu : {
            type : mongoose.Schema.Types.Mixed,
            required : false,
            default: null
        },
        user : {
            type : Number,
            required : true
        }
    }
);

const BookShema = new mongoose.Schema(
    {
        title: String,
        type: String,
        author: String,
        location: String,
        history : [HistoryShema]
    },
    { timestamps: true }
);

export const BookModel = mongoose.model("Book", BookShema, "BookStore");
