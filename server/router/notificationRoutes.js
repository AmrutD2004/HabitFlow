import express from 'express'
import userAuth from '../middleware/userAuth.js'
import { deleteNotification, getAllNotifications, markAllAsRead, unreadNotificationCount } from '../controller/notificationController.js'

const router = express.Router()


router.get('/getAllNotifications', userAuth, getAllNotifications)
router.get('/getUnreadNotificationsCount', userAuth, unreadNotificationCount)
router.put('/markAllAsRead', userAuth, markAllAsRead)
router.post('/clearNotification', userAuth, deleteNotification)

export default router