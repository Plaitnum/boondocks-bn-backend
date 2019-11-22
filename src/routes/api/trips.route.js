import express from 'express';
import trips from '../../controllers/trips.controller';
import validation from '../../validation/validation';
import checkForRooms from '../../middlewares/roomsAvailability';
import { verifyUser } from '../../middlewares/checkToken';

const router = express.Router();

/**
 * @swagger
 *
 * /trips/oneway:
 *   post:
 *     summary: Request a one way trip
 *     description: This creates a one way trip request
 *     tags:
 *       - Trips
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotelId:
 *                 type: integer
 *               type:
 *                 type: string
 *               leavingFrom:
 *                 type: string
 *               goingTo:
 *                 type: string
 *               travelDate:
 *                 type: string
 *               reason:
 *                 type: string
 *               rooms:
 *                 type: array
 *                 items:
 *                   type: integer
 *     produces:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               message:
 *                 type: string
 *               data:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   leavingFrom:
 *                     type: string
 *                   goingTo:
 *                     type: string
 *                   travelDate:
 *                     type: string
 *                   reason:
 *                     type: string
 *                   status:
 *                     type: integer
 *                   updatedAt:
 *                     type: string
 *                   createAt:
 *                     type: string
 *     responses:
 *       201:
 *         description: success
 */

router.post('/trips/oneway', verifyUser, validation, checkForRooms, trips.createOneWayTrip);

/**
 * @swagger
 *
 * /trips/return:
 *   post:
 *     summary: Make a return trip
 *     description: This creates a return trip and book required accomodation
 *     tags:
 *       - Trips
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotelId:
 *                 type: integer
 *               type:
 *                 type: string
 *               leavingFrom:
 *                 type: string
 *               goingTo:
 *                 type: string
 *               travelDate:
 *                 type: string
 *               returnDate:
 *                 type: string
 *               reason:
 *                 type: string
 *               rooms:
 *                 type: array
 *                 items:
 *                   type: integer
 *     produces:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               message:
 *                 type: string
 *               data:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   leavingFrom:
 *                     type: string
 *                   goingTo:
 *                     type: string
 *                   travelDate:
 *                     type: string
 *                   returnDate:
 *                     type: string
 *                   reason:
 *                     type: string
 *                   hotelId:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *                   status:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *                   createAt:
 *                     type: string
 *     responses:
 *       200:
 *         description: success
 *       409:
 *         description: Room not available
 *       401:
 *         description: unauthorized
 */
router.post('/trips/return', verifyUser, validation, checkForRooms, trips.createReturnTrip);

export default router;
