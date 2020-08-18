import {Category, Task} from '@shared/models';

export type UnauthenticatedStackParams = {
  Login: undefined;
  RegisterForm: undefined;
  Welcome: undefined;
  ChooseUserConfigurations: undefined;
};

export type AuthenticatedStackParams = {
  BottomNavigation: undefined;
  TaskForm: {
    chosenCategory?: Category;
    task?: Task;
  };
  CategorySearch: undefined;
  CategoryForm: {
    category?: Category;
  };
};

export type BottomNavigatorStackParams = {
  Home: undefined;
  TaskList: undefined;
  More: undefined;
  CategoryList: undefined;
  Calendar: undefined;
};

export type TasksTopBarNavigatorStackParams = {
  AllTasks: undefined;
  TasksInProgress: undefined;
  TasksCompleted: undefined;
};
