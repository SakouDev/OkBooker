import { Router } from "express";
import BorrowController from "../controllers/BorrowController";

const router = Router();

/**
 * @swagger
 * tags:
 *      name: Borrow
 *      description: Borrowing book
 */

/**
  * @openapi
  * /api/borrow/{id}:
  *  post:
  *      tags: [Borrow]
  *      description: Add an book
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: string
  *         default: 63e601b116ae0b739a8643ee
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"emprunt": "2023-02-01T00:00:00.000Z", "rendu": null, "user": 2 }
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
router.post('/:id', BorrowController.addBorrow)

/**
  * @openapi
  * /api/borrow/{id}:
  *  put:
  *      tags: [Borrow]
  *      description: Add an book
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: string
  *         default: 63e601b116ae0b739a8643ee
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"location": "Boulogne Sur mer"}
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
router.put('/:id', BorrowController.updateBorrow)


export default router
