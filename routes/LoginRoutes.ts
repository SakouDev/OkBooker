import { Router } from "express";
import LoginController from "../controllers/LoginController";

const router = Router();

/**
 * @swagger
 * tags:
 *      name: Login
 *      description: Log to the app
 */

/**
  * @openapi
  * /api/login/:
  *  post:
  *      tags: [Login]
  *      description: Login
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"emprunt": "2023-02-01T00:00:00.000Z", "rendu": null, "user": 2 }
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
router.post('/', LoginController.loginAdmin)

/**
  * @openapi
  * /api/login/qr:
  *  post:
  *      tags: [Login]
  *      description: Login
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"emprunt": "2023-02-01T00:00:00.000Z", "rendu": null, "user": 2 }
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
router.post('/qr', LoginController.loginQR)



export default router
