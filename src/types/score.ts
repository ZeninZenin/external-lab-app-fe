import { Task, TaskStatus } from './task';
import { User } from 'src/types/user';

export interface Score {
  _id: string;
  deadlineDate: string;
  deadlineChangeComment: string;
  status: TaskStatus;
  task: Task;
  trainer: string;
  student: string;
  score?: number;
  comment?: string;
  submissionDate?: string;
  sendingForRevisionDate?: string;
  revisionDoneDate?: string;
  completionDate?: string;
  pullRequestLink?: string;
}

export interface ScoreWithUsers extends Omit<Score, 'student' | 'trainer'> {
  student: User;
  trainer: User;
}

export type ScoreWithDeadlineStatuses<
  T extends Score | ScoreWithUsers = Score,
> = T & {
  isUrgent: boolean;
  isOverdue: boolean;
};
