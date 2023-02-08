const { Router } = require("express")
const controllerTemplate = require("../controllers/templateController")


const router = Router();

// Routes

/**
 * @swagger
 * tags:
 *      name: Templates
 *      description: Manage template
 */

/**
 * @openapi
 * /api/templates:
 *   get:
 *      tags: [Templates]
 *      description: Welcome to swagger-jsdoc!
 *      responses:
 *        200:
 *          description: Returns a mysterious string.
 */
router.get('/', controllerTemplate.getTemplate)
/**
  * @openapi
  * /api/templates/{id}:
  *  get:
  *      tags: [Templates]
  *      description: Get an template by id
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *         default: 1
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
router.get('/:id', controllerTemplate.getTemplateById)
/**
  * @openapi
  * /api/templates:
  *  post:
  *      tags: [Templates]
  *      description: Add an template
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"name": "Template","mail": "Template@gmail.com","description": "Template","image": "https://picsum.photos/200/300"}
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
router.post('/', controllerTemplate.addTemplate)
/**
  * @openapi
  * /api/templates/{id}:
  *  put:
  *      tags: [Templates]
  *      description: Update an template
  *      consumes:
  *       - application/json
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *         default: 1
  *       - name: JSON
  *         in: body
  *         required: true
  *         type: object
  *         default: {"name": "Template","mail": "Template@gmail.com","description": "Template","image": "https://picsum.photos/200/300"}
  *      responses:
  *        200:
  *          description: Returns a mysterious string.
  */
router.put('/:id', controllerTemplate.updateTemplate)
/**
  * @openapi
  * /api/templates/{id}:
  *  delete:
  *      tags: [Templates]
  *      description: Delete an template
  *      parameters:
  *       - name: id
  *         in: path
  *         required: true
  *         type: integer
  *      responses:
  *        200:
  *          description: Returns a mysterious string. 
  */
router.delete('/:id', controllerTemplate.deleteTemplate)

module.exports = router

