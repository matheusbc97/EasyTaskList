import {Category, Task} from '@shared/models';

export type UnauthenticatedStackParams = {
  Login: undefined;
  RegisterForm: undefined;
  Welcome: undefined;
  ChooseUserConfigurations: undefined;
  ForgotPasswordForm: undefined;
  PrivacyPolicy: undefined;
};

export type AuthenticatedStackParams = {
  BottomNavigation: undefined;
  TaskForm:
    | undefined
    | {
        task?: Task;
      };
  CreateTaskForm: undefined;
  UpdateTaskForm: {
    task: Task;
  };
  CategorySearch: {
    onCategoryChange: (category: Category) => void;
  };
  CategoryForm:
    | {
        category?: Category;
      }
    | undefined;
  CategoryDetails: {
    category: Category;
  };
  ChangeNameForm: undefined;
  ChangeThemeForm: undefined;
  ChangeAvatar: undefined;
  ChangePasswordForm: undefined;
  About: undefined;
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
