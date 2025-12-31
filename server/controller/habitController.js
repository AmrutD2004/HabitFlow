import client from '../database/database.js'

export const createHabit = async (req, res) => {
    const userID = req.user.userID
    const { habit_title, description, category, repeat_days, reminder_time } = req.body

    if (!habit_title || !category || !Array.isArray(repeat_days) || repeat_days.length === 0) {
        return res.json({
            success: false,
            message: 'Habit title, category and repeat days are required'
        })
    }


    try {

        await client.query('BEGIN')

        const result = await client.query(`Insert into habits (user_id, habit_title, description, category, reminder_time) values ($1, $2, $3, $4, $5)
            returning habit_id, habit_title, category
            `, [userID, habit_title, description || null, category, reminder_time || null])


        const habitID = result.rows[0].habit_id

        const repeatDays = `Insert into habit_repeat_days(habit_id, day) values($1, $2)`
        for (const day of repeat_days) {
            await client.query(repeatDays, [habitID, day])
        }

        await client.query('COMMIT')

        const habit = result.rows[0]

        return res.status(201).json({
            success: true,
            message: 'Habit Created Successfully',
            habitData: habit
        })

    } catch (error) {
        await client.query('ROLLBACK')
        return res.json({
            success: false,
            message: error.message
        })
    }
};


// Get Habits
export const getHabits = async (req, res) => {
    const userID = req.user.userID

    if (!userID) {
        return res.json({
            success: false,
            message: 'User not founde please login again!'
        })
    }

    try {


        const habitsResult = await client.query(
            `SELECT habit_id, habit_title, description, category, reminder_time, is_active, base_points, created_at
       FROM habits
       WHERE user_id = $1`,
            [userID]
        );

        if (habitsResult.rows.length === 0) {
            return res.json({
                success: true,
                habits: [],
            });
        }

        const habitIds = habitsResult.rows.map(h => h.habit_id);

        const daysResult = await client.query(
            `SELECT habit_id, day
            FROM habit_repeat_days
            WHERE habit_id = ANY($1)`,
            [habitIds]
        );

        //Merge both table values
        const habits = habitsResult.rows.map(habit => {
            const days = daysResult.rows
                .filter(d => d.habit_id === habit.habit_id) //filter those habit days having same habit_id
                .map(d => d.day);

            return {
                ...habit,
                days,
            };
        });

        return res.json({
            success: true,
            habits,
        });

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

//delete Habit
export const deleteHabit = async (req, res) => {
    const userID = req.user.userID;
    const { habit_id } = req.body;

    if (!userID || !habit_id) {
        return res.status(400).json({
            success: false,
            message: 'Missing habit id',
        });
    }

    try {
        const result = await client.query(
            `UPDATE habits
       SET is_active = false
       WHERE habit_id = $1 AND user_id = $2
       RETURNING habit_id`,
            [habit_id, userID]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Habit not found or already deleted',
            });
        }

        return res.json({
            success: true,
            message: 'Habit deleted successfully',
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//Edit habit
export const editHabit = async (req, res) => {
    const { habitID, habit_title, description, category, repeat_days, reminder_time } = req.body


    if (!habitID) {
        return res.json({
            success: false,
            message: 'Missing Habit id'
        })
    }
    if (!habit_title || !category || !Array.isArray(repeat_days) || repeat_days.length === 0) {
        return res.json({
            success: false,
            message: 'Habit title, category and repeat days are required'
        })
    }
    try {
        await client.query("BEGIN")
        const result = await client.query(`update habits set habit_title = $1 , description = $2, category = $3, reminder_time = $4 where habit_id = $5
            `, [habit_title, description || null, category, reminder_time || null, habitID])

        if (result.rowCount === 0) {
            await client.query('ROLLBACK')
            return res.json({
                success: false,
                message: 'Habit not Found'
            })
        }

        //Delete Previous Days
        await client.query(`Delete from habit_repeat_days where habit_id = $1`, [habitID])

        //Add new days
        const repeatDays = `insert into habit_repeat_days(habit_id, day) values ($1, $2)`
        for (const day of repeat_days) {
            await client.query(repeatDays, [habitID, day])
        }

        await client.query('COMMIT')

        return res.json({
            success: true,
            message: 'Habit Updated Successfully'
        })
    } catch (error) {
        await client.query('ROLLBACK')
        return res.json({
            success: false,
            message: error.message
        })
    }
}
