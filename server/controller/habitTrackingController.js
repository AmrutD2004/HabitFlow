import client from '../database/database.js'

export const habitTracking = async (req, res) => {
    const { habit_id, date, status } = req.body
    const userID = req.user.userID

    if (!habit_id || !date || typeof status !== 'boolean') {
        return res.status(400).json({
            success: false,
            message: 'Invalid payload'
        })
    }

    try {
        await client.query(
            `
      INSERT INTO habit_tracking (user_id, habit_id, date, status)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (user_id, habit_id, date)
      DO UPDATE SET status = EXCLUDED.status
      `,
            [userID, habit_id, date, status]
        )

        return res.json({ success: true })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//get habit_tracking data ffrom start and end month
export const getHabitTracking = async (req, res) => {
    const { start, end } = req.query
    const userID = req.user.userID

    if (!start || !end) {
        return res.status(400).json({
            success: false,
            message: 'start and end of month is required'
        })
    }

    try {
        const result = await client.query(
            `
      SELECT
        habit_id,
        to_char(date, 'YYYY-MM-DD') AS date,
        status
      FROM habit_tracking
      WHERE user_id = $1
        AND date >= $2
        AND date < $3
      ORDER BY date ASC
      `,
            [userID, start, end]
        )

        return res.json({
            success: true,
            data: result.rows || []
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//get all habit tracking data

export const getHabitTrackingData = async (req, res) => {
    const userID = req.user.userID

    if (!userID) {
        return res.json({
            success: false,
            message: 'Somthing went wrong please login again !'
        })
    }

    try {

        const result = await client.query(`select user_id, habit_id, date, status from habit_tracking where user_id = $1`, [userID])

        if(result.rowCount === 0){
            return res.json({
                success : false,
                message : 'User or Habit not found'
            })
        }

        return res.json({
            success : true,
            habitTrackingdata : result.rows
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}