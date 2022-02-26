import { Task, TaskStatus } from './task';

export interface Score {
  _id: string;
  deadlineDate: string;
  status: TaskStatus;
  task: Task;
  trainer: string;
  student: string;
  score?: number;
  comment?: string;
  submissionDate?: string;
  sendingForRevisionDate?: string;
  completionDate?: string;
  pullRequestLink?: string;
}
