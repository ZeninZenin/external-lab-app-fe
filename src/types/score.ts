import { Task, TaskStatus } from './task';
import { User } from 'src/types/user';

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
  revisionDoneDate?: string;
  completionDate?: string;
  pullRequestLink?: string;
}

export interface ScoreWithUsers extends Omit<Score, 'student' | 'trainer'> {
  student: User;
  trainer: User;
}
