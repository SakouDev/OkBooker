import mongoose from "./connect";

export const Database = () => {
    const BookShema = new mongoose.Schema(
        {
            title: String,
            type: String,
            author: String,
            available: Boolean,
        },
        { timestamps: true }
    );
    
    const BookModel = mongoose.model("Book", BookShema, "BookStore");

    var books = [{ name: 'Mongoose Tutorial'},
                { name: 'NodeJS tutorial'},
                { name: 'MongoDB Tutorial'}];
    
    // const Book = new BookModel({ title: "The Lord of the Rings" });
    
    // Book.save().then(() => console.log("Book saved to database."));
}
