import client from "../database/database.js";


export const getUserData = async (req, res) => {
    try {

        const userID = req.user.userID
        const result = await client.query(`select user_id, username, email, age, dob, is_account_verified, created_at, points from users where user_id = $1`, [userID])

        const user = result.rows[0]

        return res.json({
            success: true,
            userData: user
        })


    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const updateUserData = async (req, res) => {
    const userID = req.user.userID
    const { username } = req.body
    try {



        if (!username) {
            return res.json({
                success: false,
                message: 'Missing Details'
            })
        }

        const result = await client.query(`update users set username = $1 where user_id = $2`, [username, userID])

        //check if user not founde
        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.json({
            success: true,
            message: 'Profile Updated'
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}