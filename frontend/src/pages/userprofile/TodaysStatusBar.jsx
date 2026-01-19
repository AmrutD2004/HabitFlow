import React, { useMemo } from "react";
import { CheckCircle2 } from "lucide-react";
import { DateTime } from "luxon";

const TodaysStatusBar = ({ habits, checkedMap }) => {
  const today = DateTime.now();
  const todayISO = today.toISODate();
  const todayWeekday = today.toFormat("ccc"); // Mon, Tue, etc

  const { total, completed, percentage } = useMemo(() => {
    let totalHabitsToday = 0;
    let completedHabitsToday = 0;

    habits
      .filter((h) => h.is_active)
      .forEach((habit) => {
        if (habit.days.includes(todayWeekday)) {
          totalHabitsToday++;

          const key = `${habit.habit_id}-${todayISO}`;
          if (checkedMap[key]) {
            completedHabitsToday++;
          }
        }
      });

    return {
      total: totalHabitsToday,
      completed: completedHabitsToday,
      percentage:
        totalHabitsToday === 0
          ? 0
          : Math.round((completedHabitsToday / totalHabitsToday) * 100),
    };
  }, [habits, checkedMap, todayISO, todayWeekday]);

  if (total === 0) {
    return (
      <div className="ml-auto text-sm text-neutral-500">
        No habits scheduled for today
      </div>
    );
  }

  return (
    <div className="ml-auto flex items-center lg:justify-end gap-4">
      {/* Text */}
      <div className="flex flex-col text-right">
        <span className="text-xs text-neutral-500">Today's Progress</span>
        <span className="text-sm font-semibold text-neutral-800">
          {completed} / {total} completed
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-36 h-2 bg-neutral-200 rounded overflow-hidden">
        <div
          className="h-full bg-green-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Percentage */}
      <div className="flex items-center gap-1 text-green-700 text-sm font-semibold">
        <CheckCircle2 size={16} />
        {percentage}%
      </div>
    </div>
  );
};

export default TodaysStatusBar;