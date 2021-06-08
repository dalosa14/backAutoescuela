/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: registro.
 *     description: enviamos los datos de registro al servidor y si los datos son correctos se creará el usuario correspondiente.
 *     parameters:
 *       name: email
 *       required: true
 *       description: El email lde un usuario existente.
 *       schema:
 *         type: string
 *     responses:
 *       200:
 *         description: nos devuelve la información de email y usuario agregados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "logueo compleatado"
 *                 data:
 *                   type: object
 *                   example: {user:object,token:string}
 *                   description: nos devuelve los datos que sean necesarios.
 *                 success:
 *                   type: boolean
 *                   description: nos dice si eel resultado es satisfactorio o no.
 *                   example: true | false
 */