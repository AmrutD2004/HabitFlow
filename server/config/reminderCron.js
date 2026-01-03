import cron from 'node-cron'
import client from '../database/database.js'

export const startReminder = () => {
    cron.schedule("* * * * *", async () => {
        try {
            //get system time
            const now = new Date()
            const currentTime = now.toTimeString().slice(0, 5);

            //find active reminders matching current time and habit which are not mark completed (status = false)
            const reminders = await client.query(
                `select h.user_id, h.habit_id, h.habit_title, h.reminder_time from habits h left join habit_tracking ht on ht.habit_id = h.habit_id AND ht.date = CURRENT_DATE
                where is_active = true
                and to_char(h.reminder_time, 'HH24:MI') = $1 
                AND (ht.status IS NULL OR ht.status = false);
            `, [currentTime]
            );

            console.log({
                serverTime: now.toString(),
                currentTime,
            });


            for (const reminder of reminders.rows) {
                //check if already sent today even if status is false 
                const message = `⏰ It’s time for ${reminder.habit_title} at (${reminder.reminder_time})`
                const alreadySent = await client.query(
                    `select 1 from habit_notifications
                    where habit_id = $1
                    AND DATE(sent_at) = CURRENT_DATE
                    `,
                    [reminder.habit_id]
                );

                if (alreadySent.rowCount === 0) {
                    await client.query(
                        `INSERT INTO habit_notifications (user_id, habit_id, type, message)
             VALUES ($1, $2, 'in_app', $3)`,
                        [reminder.user_id, reminder.habit_id, message]
                    );

                    console.log(
                        `🔔 Notification created for user ${reminder.user_id} at ${currentTime}`
                    );
                }

            }

        } catch (error) {
            console.log(error.message)
        }
    })
}