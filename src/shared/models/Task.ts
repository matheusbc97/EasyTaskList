import {Category} from '.';

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  category: Category | undefined;
}
