"use client";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import type { Dispatch, HTMLAttributes } from "react";
import { type DateRange } from "react-day-picker";

import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn";
import { cn } from "~/lib/utils";
import { useIsSmallScreen } from "~/utils/hooks";

interface DatePickerWithRangeProps {
  date: DateRange | undefined;
  setDate: Dispatch<DateRange | undefined>;
}

const DatePickerWithRange = ({
  className,
  date,
  setDate,
}: DatePickerWithRangeProps & HTMLAttributes<HTMLDivElement>) => {
  const isSmallScreen = useIsSmallScreen();

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={isSmallScreen ? 1 : 2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerWithRange;
