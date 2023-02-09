import { Router } from "express";
import BooksController from "../controllers/BooksController";

const router = Router();

/**
 * @swagger
 * tags:
 *      name: Books
 *      description: Manage book
 */

/**
 * @openapi
 * /api/books:
 *   get:
 *      tags: [Books]
 *      description: Welcome to swagger-jsdoc!
 *      responses:
 *        200:
 *          description: Returns a mysterious string.
 */
router.get('/', BooksController.getBook)
/**
  * @openapi
  * /api/books/{id}:
  *  get:
  *      tags: [Books]
  *      description: Get an book by id
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: string
  *         default: 1
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
router.get('/:id', BooksController.getBookById)
/**
  * @openapi
  * /api/books:
  *  post:
  *      tags: [Books]
  *      description: Add an book
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"title": "OnePiece","type": "Manga","author": "Eichiro Oda","location": "Boulogne Sur mer","history" : [{ "emprunt": "2023-01-26T00:00:00.000Z", "rendu": "2023-01-27T00:00:00.000Z", "user": 1 },{ "emprunt": "2023-02-01T00:00:00.000Z", "rendu": null, "user": 2 }]}
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
router.post('/', BooksController.addBook)
/**
  * @openapi
  * /api/books/{id}:
  *  put:
  *      tags: [Books]
  *      description: Update an book
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: string
  *         default: 1
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"title": "OnePiece","type": "Manga","author": "Eichiro Oda","location": "Boulogne Sur mer","history" : [{ "emprunt": "2023-01-26T00:00:00.000Z", "rendu": "2023-01-27T00:00:00.000Z", "user": 1 },{ "emprunt": "2023-02-01T00:00:00.000Z", "rendu": null, "user": 2 }]}
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
router.put('/:id', BooksController.updateBook)
/**
  * @openapi
  * /api/books/{id}:
  *  delete:
  *      tags: [Books]
  *      description: Delete an book
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: string
  *      responses:
  *        200:
  *          description: Returns a mysterious string. 
  */
router.delete('/:id', BooksController.deleteBook)

export default router
