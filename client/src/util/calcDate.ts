type Value = [Date | null, Date | null];

export const calcDate = (val: Value): number | null => {
  if (val[0] instanceof Date && val[1] instanceof Date) {
    const firstDate = new Date(val[0]).getTime();
    const secondDate = new Date(val[1]).getTime();

    const timeDiff = Math.abs(secondDate - firstDate);

    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return dayDiff;
  } else return null;
};
