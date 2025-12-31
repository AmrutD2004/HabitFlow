import client from "../database/database.js";

// Get all notification
export const getAllNotifications = async (req, res) => {
    const userID = req.user.userID

    if (!userID) {
        return res.json({
            success: false,
            message: 'Missing user_id'
        })
    }

    try {
        const result = await client.query(`select notification_id, habit_id, type, sent_at, is_read, message from habit_notifications where user_id = $1 order by sent_at desc `, [userID])

        return res.json({
            success: true,
            notification: result.rows
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

//Get Count of unread Count

export const unreadNotificationCount = async (req, res) => {
    const userID = req.user.userID

    if (!userID) {
        return res.json({
            success: false,
            message: 'Missing user_id'
        })
    }

    try {
        const result = await client.query(`select count(*) as unread_count from habit_notifications where user_id = $1 AND is_read = false `, [userID])

        const unreadCount = Number(result.rows[0].unread_count)

        return res.json({
            success: true,
            unread_count: unreadCount
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

//Mark all Notification as read

export const markAllAsRead = async(req, res)=>{
    const userID = req.user.userID

    if(!userID){
        return res.json({
            success : false,
            message : 'Missing user_id'
        })
    }

    try{

        const result = client.query(`update habit_notifications set is_read = true where user_id = $1 `, [userID])

        return res.json({
            success : true,
        })

    }catch(error){
        return res.json({
            success : false,
            message : error.message
        })
    }
}