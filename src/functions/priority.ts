export enum PRIORITIES {
  HIGHEST = "HIGHEST",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  LOWEST = "LOWEST",
}

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case PRIORITIES.HIGHEST:
      return "text-red-500";
    case PRIORITIES.HIGH:
      return "text-orange-500";
    case PRIORITIES.MEDIUM:
      return "text-yellow-500";
    case PRIORITIES.LOW:
      return "text-green-500";
    case PRIORITIES.LOWEST:
      return "text-blue-500";
    default:
      return "";
  }
};
