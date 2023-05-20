import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}
function Calendar({ value, onChange, disabledDates }: CalendarProps) {
  return (
    <DateRange
      rangeColors={["#412db3"]}
      date={new Date()}
      direction="vertical"
      ranges={[value]}
      minDate={new Date()}
      onChange={onChange}
      showDateDisplay={false}
      disabledDates={disabledDates}
    />
  );
}

export default Calendar;
