import {createEntityAdapter} from '@reduxjs/toolkit';
import {Category} from '@shared/models';

const categoryAdapter = createEntityAdapter<Category>();

export {categoryAdapter};
