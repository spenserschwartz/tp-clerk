"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "~/ui/button";
import { Calendar } from "~/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover";
import { Dispatch } from "react";

interface DatePickerWithRangeProps {
  date: DateRange | undefined;
  setDate: Dispatch<DateRange | undefined>;
}

export function DatePickerWithRange({
  className,
  date,
  setDate,
}: DatePickerWithRangeProps & React.HTMLAttributes<HTMLDivElement>) {
  //   const [date, setDate] = React.useState<DateRange | undefined>({
  //     from: new Date(),
  //     to: addDays(new Date(), 7),
  //   });

  console.log("date", date);
  console.log(
    "range",
    (date?.from?.getDate() ?? 0) - (date?.to?.getDate() ?? 0)
  );

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
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
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
