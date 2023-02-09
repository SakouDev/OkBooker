import mongoose from "mongoose";

const BookShema = new mongoose.Schema(
    {
        title: String,
        type: String,
        author: String,
        location: String,
        history : [{
            _id : {
                type : mongoose.Schema.Types.ObjectId, 
                required:false
            }, 
            emprunt : {
                type : Date,
                required : true
            }, 
            rendu : {
                type : mongoose.Schema.Types.Mixed,
                required : false
            },
            user : {
                type : Number,
                required : true
            }
        }]
    },
    { timestamps: true }
);

export const BookModel = mongoose.model("Book", BookShema, "BookStore");
