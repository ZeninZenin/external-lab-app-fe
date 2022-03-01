export interface Task {
  _id: string;
  name: string;
  description: string;
  deadline: string;
  taskLink: string;
  isOptional: boolean;
}

export type TaskStatus =
  | 'todo'
  | 'onReview'
  | 'onRevision'
  | 'revisionDone'
  | 'done';
