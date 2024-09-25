import { defineStore } from "pinia";

export const useUtilStore = defineStore("util", () => {
  const daysOfWeek = [
    {
      label: "Monday",
      value: 1,
    },
    {
      label: "Tuesday",
      value: 2,
    },
    {
      label: "Wednesday",
      value: 3,
    },
    {
      label: "Thursday",
      value: 4,
    },
    {
      label: "Friday",
      value: 5,
    },
    {
      label: "Saturday",
      value: 6,
    },
    {
      label: "Sunday",
      value: 0,
    },
  ];

  const daysOfMonth = Array.from(Array(32).keys()).filter((n) => n > 0);

  const months = [
    {
      label: "January",
      value: 1,
    },
    {
      label: "February",
      value: 2,
    },
    {
      label: "March",
      value: 3,
    },
    {
      label: "April",
      value: 4,
    },
    {
      label: "May",
      value: 5,
    },
    {
      label: "June",
      value: 6,
    },
    {
      label: "July",
      value: 7,
    },
    {
      label: "August",
      value: 8,
    },
    {
      label: "September",
      value: 9,
    },
    {
      label: "October",
      value: 10,
    },
    {
      label: "November",
      value: 11,
    },
    {
      label: "December",
      value: 12,
    },
  ];

  return {
    daysOfWeek,
    daysOfMonth,
    months,
  };
});
