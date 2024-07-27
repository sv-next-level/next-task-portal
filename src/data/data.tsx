import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleCheckIcon,
  CircleCrossIcon,
  CircleIcon,
  CircleQuestionIcon,
  CircleStopwatchIcon,
} from "@/nextjs/assets";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: CircleQuestionIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: CircleStopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CircleCheckIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CircleCrossIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ChevronDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ChevronRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ChevronUpIcon,
  },
];
