import {createUserProfileDocument} from './createUserProfileDocument';
import {createUserTask} from './createUserTask';
import {getCurrentUser} from './getCurrentUser';
import {getFirestoreUser} from './getFirestoreUser';
import {getUserCategories} from './getUserCategories';
import {signInWithEmailAndPassword} from './signInWithEmailAndPassword';
import {updateUserData} from './updateUserData';
import {getUserTasks} from './getUserTasks';
import {updateUserTask} from './updateUserTask';
import {createUserCategory} from './creatUserCategory';
import {updateUserCategory} from './updateUserCategory';
import {getInitialCategories} from './getInitialCategories';
import {resetAuthUser} from './resetAuthUser';
import {changeUserPassword} from './changePassword';
import {sendResetPasswordToken} from './sendResetPasswordToken';
import {getPrivacyPolicy} from './getPrivacyPolicy';
import {getAboutItemsFromDatabase} from './getAboutItemsFromDatabase';

export {
  createUserProfileDocument,
  createUserTask,
  getCurrentUser,
  getFirestoreUser,
  getUserCategories,
  signInWithEmailAndPassword,
  updateUserData,
  getUserTasks,
  updateUserTask,
  createUserCategory,
  updateUserCategory,
  getInitialCategories,
  resetAuthUser,
  changeUserPassword,
  sendResetPasswordToken,
  getPrivacyPolicy,
  getAboutItemsFromDatabase,
};
