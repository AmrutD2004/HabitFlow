import React, { useContext } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import ProgessBar from "./ProgessBar";
import { AuthContext } from "../context/AuthContext";
import { HabitTrackingContext } from "../context/HabitTrackingContext";

const HabitTrackerTable = ({ habitData }) => {
  const { BASE_URL, setPoints } = useContext(AuthContext);
  const POINTS_PER_HABIT = 10;

  const {
    checkedMap,
    firstDayOfActiveMonth,
    daysOfMonth,
    toggleCell,
    getPreviousMonth,
    getNextMonth,
    getUserHabitTrackingData,
    visibleDays,
  } = useContext(HabitTrackingContext);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (habit_id, date, status) => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${BASE_URL}/user/habitTracking`, {
        habit_id,
        date,
        status,
      });

      if (data.success) toast.success("Habit Checked");
      await getUserHabitTrackingData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    /* Desktop-only fixed container */
    <div className=" lg:block max-w-[1366px] mx-auto">
      <div className=" rounded overflow-hidden">

        {/* Month Header */}
        <div className="flex items-center justify-center gap-6 py-2 bg-red-50 border-b border-red-500 text-sm font-semibold">
          <button onClick={getPreviousMonth}>
            <ChevronLeft size={18} />
          </button>

          <span>
            {firstDayOfActiveMonth.monthLong}, {firstDayOfActiveMonth.year}
          </span>

          <button onClick={getNextMonth}>
            <ChevronRight size={18} />
          </button>
        </div>

        {/* FIXED TABLE */}
        <table className="table-fixed w-full border-collapse text-[10px]">
          <thead className="bg-red-100 border-b border-red-500">
            <tr>
              <th className="w-[90px] lg:w-[180px] font-bold px-2 py-2 text-left text-red-600">
                Habits
              </th>

              <th className="w-[80px] font-bold px-1 py-2 text-center text-red-600">
                Category
              </th>

              {visibleDays.map((day, idx) => {
                if (day.month !== firstDayOfActiveMonth.month) return null;
                const isToday = day.toISODate() === today;

                return (
                  <th
                    key={idx}
                    className={`w-[24px] px-0 py-2 text-center font-medium
                      ${
                        isToday
                          ? "bg-red-500 text-white"
                          : "bg-red-100 text-red-600"
                      }`}
                  >
                    {day.day}
                  </th>
                );
              })}

              <th className="w-20 px-2 py-1 text-center text-red-600">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="bg-white font-medium text-neutral-800">
            {habitData
              .filter(h => h.is_active)
              .map(habit => {
                const scheduledDates = daysOfMonth.filter(day => {
                  const weekday = day.toFormat("ccc");
                  return (
                    day.month === firstDayOfActiveMonth.month &&
                    habit.days.includes(weekday)
                  );
                });

                const totalDays = scheduledDates.length;
                const completedDays = scheduledDates.filter(day => {
                  const key = `${habit.habit_id}-${day.toISODate()}`;
                  return checkedMap[key];
                }).length;

                const percentage =
                  totalDays === 0
                    ? 0
                    : Math.round((completedDays / totalDays) * 100);

                return (
                  <tr key={habit.habit_id}>
                    <td className="w-[90px] lg:w-[180px] px-2 py-1 border border-neutral-300 ">
                      {habit.habit_title}
                    </td>

                    <td className="px-1 py-1 text-center border border-neutral-300">
                      {habit.category}
                    </td>

                    {visibleDays.map(day => {
                      if (day.month !== firstDayOfActiveMonth.month) return null;

                      const isoDate = day.toISODate();
                      const cellKey = `${habit.habit_id}-${isoDate}`;
                      const isChecked = checkedMap[cellKey] || false;
                      const weekday = day.toFormat("ccc");
                      const isHabitDay = habit.days.includes(weekday);
                      const isToday = isoDate === today;

                      return (
                        <td
                          key={cellKey}
                          className="px-0 py-1 text-center border border-neutral-300"
                        >
                          {isHabitDay && (
                            <label
                              className={`inline-flex w-3 h-3 rounded
                                ${
                                  isChecked
                                    ? "bg-green-600"
                                    : "bg-neutral-300"
                                }
                                ${
                                  isToday
                                    ? "cursor-pointer hover:bg-neutral-400 transition-colors duration-200"
                                    : "opacity-50 cursor-not-allowed"
                                }
                              `}
                            >
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={isChecked}
                                onChange={() => {
                                  if (!isToday) {
                                    toast.error(
                                      "You can mark today's habit only!"
                                    );
                                    return;
                                  }

                                  toggleCell(habit.habit_id, isoDate);
                                  setPoints(prev =>
                                    isChecked
                                      ? Math.max(prev - POINTS_PER_HABIT, 0)
                                      : prev + POINTS_PER_HABIT
                                  );
                                  handleSubmit(
                                    habit.habit_id,
                                    isoDate,
                                    !isChecked
                                  );
                                }}
                              />
                            </label>
                          )}
                        </td>
                      );
                    })}

                    <td className="px-1 py-1 border border-neutral-300">
                      <ProgessBar percentage={percentage} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HabitTrackerTable;
