const getDateByDateAndTime = (date: string, time: string) => {
  const formTime = new Date(time);
  const formDate = new Date(date);

  return new Date(
    formDate.getFullYear(),
    formDate.getMonth(),
    formDate.getDate(),
    formTime.getHours(),
    formTime.getMinutes(),
  );
};

export default getDateByDateAndTime;
