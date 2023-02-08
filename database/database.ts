import mongoose from "mongoose";

    const BookShema = new mongoose.Schema(
        {
            title: String,
            type: String,
            author: String,
            available: Boolean,
        },
        { timestamps: true }
    );
    
    export const BookModel = mongoose.model("Book", BookShema, "BookStore");
                
// const Book = new BookModel({ title: "The Lord of the Rings" });
                
// Book.save().then(() => console.log("Book saved to database."));
