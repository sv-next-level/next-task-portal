export enum STATUS {
  TODO = "TODO",
  DONE = "DONE",
  BACKLOG = "BACKLOG",
  CANCELED = "CANCELED",
  IN_PROGRESS = "IN PROGRESS",
}

export const getStatusColor = (status: string): string => {
  switch (status) {
    case STATUS.BACKLOG:
      return "text-gray-500";
    case STATUS.TODO:
      return "text-blue-500";
    case STATUS.IN_PROGRESS:
      return "text-purple-500";
    case STATUS.DONE:
      return "text-green-500";
    case STATUS.CANCELED:
      return "text-red-500";
    default:
      return "";
  }
};
