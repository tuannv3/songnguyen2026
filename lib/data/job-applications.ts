export type JobApplicationStatus = "new" | "reviewing" | "interview" | "hired" | "rejected";

export const JOB_APPLICATION_STATUSES: JobApplicationStatus[] = [
  "new",
  "reviewing",
  "interview",
  "hired",
  "rejected",
];

export const JOB_APPLICATION_STATUS_LABELS: Record<JobApplicationStatus, string> = {
  new: "Mới",
  reviewing: "Đang xem xét",
  interview: "Mời phỏng vấn",
  hired: "Đã tuyển",
  rejected: "Từ chối",
};

export const JOB_APPLICATION_STATUS_TONE: Record<JobApplicationStatus, "accent" | "primary" | "neutral"> = {
  new: "accent",
  reviewing: "accent",
  interview: "primary",
  hired: "primary",
  rejected: "neutral",
};
