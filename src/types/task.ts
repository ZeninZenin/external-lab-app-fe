export interface Task {
  _id: string;
  name: string;
  description: string;
  deadline: string;
}

export type TaskStatus = 'todo' | 'onReview' | 'onRevision' | 'done';
