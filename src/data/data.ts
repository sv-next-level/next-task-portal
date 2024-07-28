import {
  ChevronDownIcon,
  ChevronsDownIcon,
  ChevronsUpIcon,
  ChevronUpIcon,
  CircleCheckIcon,
  CircleCrossIcon,
  CircleIcon,
  CircleQuestionIcon,
  CircleStopwatchIcon,
  EqualIcon,
} from "@/nextjs/assets";

import { title } from "@/common/functions";

import { PRIORITIES, STATUS } from "@/functions";

export const statuses = [
  {
    label: title(STATUS.BACKLOG),
    value: STATUS.BACKLOG,
    icon: CircleQuestionIcon,
  },
  {
    label: title(STATUS.TODO),
    value: STATUS.TODO,
    icon: CircleIcon,
  },
  {
    label: title(STATUS.IN_PROGRESS),
    value: STATUS.IN_PROGRESS,
    icon: CircleStopwatchIcon,
  },
  {
    label: title(STATUS.DONE),
    value: STATUS.DONE,
    icon: CircleCheckIcon,
  },
  {
    label: title(STATUS.CANCELED),
    value: STATUS.CANCELED,
    icon: CircleCrossIcon,
  },
];

export const priorities = [
  {
    label: title(PRIORITIES.HIGHEST),
    value: PRIORITIES.HIGHEST,
    icon: ChevronsUpIcon,
  },
  {
    label: title(PRIORITIES.HIGH),
    value: PRIORITIES.HIGH,
    icon: ChevronUpIcon,
  },
  {
    label: title(PRIORITIES.MEDIUM),
    value: PRIORITIES.MEDIUM,
    icon: EqualIcon,
  },
  {
    label: title(PRIORITIES.LOW),
    value: PRIORITIES.LOW,
    icon: ChevronDownIcon,
  },
  {
    label: title(PRIORITIES.LOWEST),
    value: PRIORITIES.LOWEST,
    icon: ChevronsDownIcon,
  },
];
