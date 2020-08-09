import {Category} from '.';

export interface Task {
  title: string;
  description: string;
  date: string;
  category: Category;
}
