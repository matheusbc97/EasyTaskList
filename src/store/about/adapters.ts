import {createEntityAdapter} from '@reduxjs/toolkit';
import {AboutItem} from '@shared/models';

const aboutItemsAdapter = createEntityAdapter<AboutItem>({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export {aboutItemsAdapter};
