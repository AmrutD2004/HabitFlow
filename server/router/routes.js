import express from 'express'
import { isAuthenticated, login, logout, register, sendVerifiedOtp, verifyOTP } from '../controller/authController.js'
import userAuth from '../middleware/userAuth.js'
import { getUserData, updateUserData } from '../controller/userController.js'
import { createHabit, deleteHabit, editHabit, getHabits } from '../controller/habitController.js'
import { getHabitTracking, getHabitTrackingData, habitTracking } from '../controller/habitTrackingController.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)  
router.post('/logout', logout)
router.post('/sendotp', userAuth, sendVerifiedOtp)
router.post('/verifyotp', userAuth, verifyOTP)

router.get('/is-auth', userAuth, isAuthenticated)

//User routes
router.get('/userData', userAuth, getUserData)
router.put('/updateUserData', userAuth, updateUserData)

//habit routes
router.post('/createHabit', userAuth, createHabit)
router.get('/getHabits', userAuth, getHabits)
router.put('/deleteHabit', userAuth, deleteHabit)
router.put('/editHabit', userAuth, editHabit)

//habit tracking status
router.post('/habitTracking', userAuth, habitTracking)
router.get('/getHabitTracking', userAuth, getHabitTracking)
router.get('/getUserHabitTracking', userAuth, getHabitTrackingData)

export default router