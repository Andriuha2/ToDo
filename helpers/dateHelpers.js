export const formatDate = (date) => {
  const addZero = (num) => (num < 10 ? "0" + num : num);

  const h = addZero(new Date(date).getHours());
  const min = addZero(new Date(date).getMinutes());
  const s = addZero(new Date(date).getSeconds());
  const d = addZero(new Date(date).getDate());
  const mon = addZero(new Date(date).getMonth() + 1);
  const y = new Date(date).getFullYear();

  return `${h}:${min}:${s} \xa0 ${d}-${mon}-${y}`;
};
