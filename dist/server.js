var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_cors = __toESM(require("cors"));
var import_express4 = __toESM(require("express"));

// routes/BooksRoutes.ts
var import_express = require("express");

// Models/Books.ts
var import_mongoose = __toESM(require("mongoose"));
var HistoryShema = new import_mongoose.default.Schema(
  {
    _id: {
      type: import_mongoose.default.Schema.Types.ObjectId,
      unique: true,
      default: () => new import_mongoose.default.Types.ObjectId()
    },
    emprunt: {
      type: Date,
      required: true
    },
    rendu: {
      type: import_mongoose.default.Schema.Types.Mixed,
      required: false,
      default: null
    },
    user: {
      type: Number,
      required: true
    }
  }
);
var BookShema = new import_mongoose.default.Schema(
  {
    title: String,
    type: String,
    author: String,
    location: String,
    history: [HistoryShema]
  },
  { timestamps: true }
);
var BookModel = import_mongoose.default.model("Book", BookShema, "BookStore");

// controllers/BooksController.ts
var getBook = async (req, res) => {
  const result = await BookModel.find({});
  res.status(200).json({ message: "All Books!", result });
};
var getBookById = async (req, res) => {
  const result = await BookModel.findById(req.params.id);
  res.status(200).json({ message: "One book!", result });
};
var addBook = async (req, res) => {
  const result = await BookModel.create(req.body);
  res.status(200).json({ message: "Books added!", result });
};
var updateBook = async (req, res) => {
  const result = await BookModel.findOneAndUpdate({ _id: req.params.id }, req.body);
  res.status(200).json({ message: "Books Updated!", result });
};
var deleteBook = async (req, res) => {
  const result = await BookModel.deleteOne({ title: req.params.title });
  res.status(200).json({ message: "Books added!", result });
};
var BooksController_default = {
  getBook,
  getBookById,
  addBook,
  updateBook,
  deleteBook
};

// routes/BooksRoutes.ts
var router = (0, import_express.Router)();
router.get("/", BooksController_default.getBook);
router.get("/:id", BooksController_default.getBookById);
router.post("/", BooksController_default.addBook);
router.put("/:id", BooksController_default.updateBook);
router.delete("/:id", BooksController_default.deleteBook);
var BooksRoutes_default = router;

// routes/BorrowRoutes.ts
var import_express2 = require("express");

// controllers/BorrowController.ts
var import_mongoose2 = __toESM(require("mongoose"));
var addBorrow = async (req, res) => {
  BookModel.findById(req.params.id).then((element) => {
    let rendu;
    switch (element.history[element.history.length - 1].rendu) {
      case null:
        return res.status(400).json({ message: "Le livre a d\xE9j\xE0 \xE9t\xE9 emprunt\xE9." });
        break;
      default:
        element.history.push({
          _id: new import_mongoose2.default.Types.ObjectId(),
          emprunt: new Date(req.body.emprunt),
          rendu,
          user: req.body.user
        });
        element.save();
        res.status(200).json("Created!");
        break;
    }
  });
};
var updateBorrow = async (req, res) => {
  const book = await BookModel.findById(req.params.id);
  if (book.history[book.history.length - 1].rendu !== null && book.history[book.history.length - 1].rendu !== void 0) {
    return res.status(400).json({ message: "Book already returned" });
  }
  switch (book) {
    case void 0:
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
};
var BorrowController_default = {
  addBorrow,
  updateBorrow
};

// routes/BorrowRoutes.ts
var router2 = (0, import_express2.Router)();
router2.post("/:id", BorrowController_default.addBorrow);
router2.put("/:id", BorrowController_default.updateBorrow);
var BorrowRoutes_default = router2;

// routes/LoginRoutes.ts
var import_express3 = require("express");

// controllers/LoginController.ts
var import_axios = __toESM(require("axios"));
var login = async (req, res) => {
  const result = await import_axios.default.get("http://141.94.247.187:3000/api/v1/list").then((response) => {
    return response.data;
  });
  const { name, code } = req.body;
  let bool = false;
  result.forEach((element) => {
    if (element.name === name && element.code === code) {
      bool = true;
    }
  });
  if (bool) {
    res.status(200).json({ message: "Logged In" });
  } else {
    res.status(401).json({ message: "Wrong Credentials" });
  }
};
var LoginController_default = {
  login
};

// routes/LoginRoutes.ts
var router3 = (0, import_express3.Router)();
router3.post("/", LoginController_default.login);
var LoginRoutes_default = router3;

// server.ts
var import_config = require("dotenv/config");

// database/connect.ts
var import_mongoose3 = __toESM(require("mongoose"));
var options = { useNewUrlParser: true, useUnifiedTopology: true };
import_mongoose3.default.set("strictQuery", false);
import_mongoose3.default.connect(process.env.MONGODB_URI, options).then(() => console.log("Connected to MongoDB.")).catch((error) => console.error(error));

// server.ts
var swaggerJsDoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
var app = (0, import_express4.default)();
app.use((0, import_cors.default)());
app.use(import_express4.default.json());
var port = process.env.PORT || 5e3;
app.listen(port, () => {
  console.log(`Serveur d\xE9marr\xE9 sur le port ${port}...`);
});
var swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Books API",
      description: "API for books management app",
      contact: {
        name: "Luc Vigneron & Remy Cottrez"
      },
      servers: [{
        url: `http://localhost:5000`,
        description: "localhost"
      }]
    }
  },
  apis: [`./routes/*.ts`]
};
var swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/books", BooksRoutes_default);
app.use("/api/borrow", BorrowRoutes_default);
app.use("/api/login", LoginRoutes_default);
