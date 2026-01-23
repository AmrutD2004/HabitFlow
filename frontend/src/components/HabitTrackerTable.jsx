import React, { useContext } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import ProgessBar from "./ProgessBar";
import { AuthContext } from "../context/AuthContext";
import { HabitTrackingContext } from "../context/HabitTrackingContext";
import { DateTime } from "luxon";

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

  const todayISO = DateTime.local().toISODate();
  const yesterdayISO = DateTime.local().minus({ days: 1 }).toISODate();

  /* -------------------------
     DAY-WISE CORRECT STATS
     (scheduled habits only)
     ------------------------- */
  const getDayStats = (dateISO) => {
    const weekday = DateTime.fromISO(dateISO).toFormat("ccc");

    let total = 0;
    let completed = 0;

    habitData
      .filter(h => h.is_active && h.days.includes(weekday))
      .forEach(habit => {
        total += 1;
        const key = `${habit.habit_id}-${dateISO}`;
        if (checkedMap[key]) completed += 1;
      });

    const percentage =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return { total, completed, percentage };
  };

  const todayStats = getDayStats(todayISO);
  const yesterdayStats = getDayStats(yesterdayISO);

  /* -------------------------
     API SUBMIT
     ------------------------- */
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
    <div className="max-w-[1366px] mx-auto">
      <div className="rounded overflow-hidden">

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

        <table className="table-fixed w-full border-collapse text-[10px]">
          <thead className="bg-red-100 border-b border-red-500">
            <tr>
              <th className="w-[140px] px-2 py-2 text-left text-red-600 font-bold">
                Habits
              </th>

              <th className="w-[90px] px-2 py-2 text-center text-red-600 font-bold">
                Category
              </th>

              {visibleDays.map((day, idx) => {
                if (day.month !== firstDayOfActiveMonth.month) return null;

                const iso = day.toISODate();
                const isToday = iso === todayISO;
                const isYesterday = iso === yesterdayISO;

                return (
                  <>
                    <th className="lg:hidden w-[26px] px-0 py-2 text-center bg-red-100 text-red-600 font-bold relative group">
                      {day.day-1}
                      <div className="pointer-events-none absolute z-50 hidden group-hover:block
                                      -top-9 left-1/2 -translate-x-1/2
                                      rounded bg-black px-2 py-1 text-[9px] text-white shadow-lg">
                          <div className="font-semibold">Yesterday</div>
                          <div>
                            {yesterdayStats.completed} / {yesterdayStats.total} completed
                          </div>
                          <div>{yesterdayStats.percentage}%</div>
                        </div>
                    </th>

                    <th
                      key={idx}
                      className={`relative group w-[26px] px-0 py-2 text-center font-medium
                      ${isToday
                          ? "bg-red-500 text-white"
                          : "bg-red-100 text-red-600"
                        }`}
                    >
                      {day.day}

                      {/* TODAY TOOLTIP */}
                      {isToday && (
                        <div className="pointer-events-none absolute z-50 hidden group-hover:block
                                      -top-9 left-1/2 -translate-x-1/2
                                      rounded bg-black px-2 py-1 text-[9px] text-white shadow-lg">
                          <div className="font-semibold">Today</div>
                          <div>
                            {todayStats.completed} / {todayStats.total} completed
                          </div>
                          <div>{todayStats.percentage}%</div>
                        </div>
                      )}

                      {/* YESTERDAY TOOLTIP */}
                      {isYesterday && (
                        <div className="pointer-events-none absolute z-50 hidden group-hover:block
                                      -top-9 left-1/2 -translate-x-1/2
                                      rounded bg-black px-2 py-1 text-[9px] text-white shadow-lg">
                          <div className="font-semibold">Yesterday</div>
                          <div>
                            {yesterdayStats.completed} / {yesterdayStats.total} completed
                          </div>
                          <div>{yesterdayStats.percentage}%</div>
                        </div>
                      )}
                    </th>
                  </>
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
                    <td className="px-2 py-1 border border-neutral-300">
                      {habit.habit_title}
                    </td>

                    <td className="px-2 py-1 text-center border border-neutral-300">
                      {habit.category}
                    </td>

                    {visibleDays.map(day => {
                      if (day.month !== firstDayOfActiveMonth.month) return null;

                      const isoDate = day.toISODate();
                      const key = `${habit.habit_id}-${isoDate}`;
                      const isChecked = checkedMap[key] || false;
                      const isToday = isoDate === todayISO;
                      const weekday = day.toFormat("ccc");
                      const isHabitDay = habit.days.includes(weekday);

                      return (
                        <>
                          {/* Mobile-only Yesterday cell */}
                          <td className="lg:hidden px-0 py-1 text-center border border-neutral-300">
                            {(() => {
                              const weekday = DateTime.fromISO(yesterdayISO).toFormat("ccc");
                              const isHabitYesterday = habit.days.includes(weekday);
                              const key = `${habit.habit_id}-${yesterdayISO}`;
                              const isChecked = checkedMap[key];

                              if (!isHabitYesterday) return null;

                              return (
                                <div
                                  className={`w-3 h-3 mx-auto rounded ${isChecked ? "bg-green-600" : "bg-neutral-300"
                                    }`}
                                />
                              );
                            })()}
                          </td>

                          <td
                            key={key}
                            className="px-0 py-1 text-center border border-neutral-300"
                          >
                            {isHabitDay && (
                              <label
                                className={`inline-flex w-3 h-3 rounded
                                ${isChecked ? "bg-green-600" : "bg-neutral-300"}
                                ${isToday
                                    ? "cursor-pointer"
                                    : "opacity-50 cursor-not-allowed"
                                  }`}
                              >
                                <input
                                  type="checkbox"
                                  className="hidden"
                                  checked={isChecked}
                                  onChange={() => {
                                    if (!isToday) {
                                      toast.error("You can mark today's habit only!");
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
                        </>
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
