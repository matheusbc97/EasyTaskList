import {doesListItemNeedsMoreMargin} from '@/modules/shared/utils/doesListItemNeedsMoreMargin';

describe('doesListItemNeedsMoreMargin Util', () => {
  it('if its not last item and array has remainder should return false', () => {
    const needsMoreMargin = doesListItemNeedsMoreMargin({
      arrayLength: 4,
      columns: 5,
      index: 2,
    });

    expect(needsMoreMargin).toBe(false);
  });

  it('if its last item and array does not have remainder should return false', () => {
    const needsMoreMargin = doesListItemNeedsMoreMargin({
      arrayLength: 5,
      columns: 5,
      index: 4,
    });

    expect(needsMoreMargin).toBe(false);
  });

  it('if its not last item and array does not have remainder should return false', () => {
    const needsMoreMargin = doesListItemNeedsMoreMargin({
      arrayLength: 3,
      columns: 3,
      index: 2,
    });

    expect(needsMoreMargin).toBe(false);
  });

  it('if has remainder and its last item should return true', () => {
    const needsMoreMargin = doesListItemNeedsMoreMargin({
      arrayLength: 4,
      columns: 3,
      index: 4,
    });

    expect(needsMoreMargin).toBe(false);
  });
});
