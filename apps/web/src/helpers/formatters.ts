export const minutesToHoursAndMinutes = (time: number): string => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${loadZeros(hours)}:${loadZeros(minutes)}`;
};

export const loadZeros = (duration: number) => {
  return String(duration).length === 1 ? "0" + duration : duration;
};
