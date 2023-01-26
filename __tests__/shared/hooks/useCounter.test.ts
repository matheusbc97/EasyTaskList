import {useCounter} from '@/shared/hooks';
import {act, renderHook} from '@testing-library/react-native';

describe('useCounter Hook', () => {
  it('Should add one to the counter', () => {
    const {result} = renderHook(() => useCounter());

    act(() => {
      result.current[1](1);
    });

    expect(result.current[0]).toBe(1);
  });

  it('Should reset counter at 0 after max value', () => {
    const {result} = renderHook(() => useCounter({maxValue: 1}));

    act(() => {
      result.current[1](2);
    });

    expect(result.current[0]).toBe(0);
  });

  it('Should reset counter at minValue after max value', () => {
    const minValue = -3;
    const {result} = renderHook(() => useCounter({maxValue: 1, minValue}));

    act(() => {
      result.current[1](2);
    });

    expect(result.current[0]).toBe(minValue);
  });

  it('Should subtract one to the counter', () => {
    const {result} = renderHook(() => useCounter());

    act(() => {
      result.current[1](-1);
    });

    expect(result.current[0]).toBe(-1);
  });

  it('Should reset counter at 0 only after minValue', () => {
    const minValue = -2;

    const {result} = renderHook(() =>
      useCounter({minValue, isCountdown: true}),
    );

    act(() => {
      result.current[1](minValue);
    });

    expect(result.current[0]).toBe(minValue);

    act(() => {
      result.current[1](-1);
    });

    expect(result.current[0]).toBe(0);
  });

  it('Should reset counter at maxValue only after minValue', () => {
    const minValue = -2;
    const maxValue = 3;

    const {result} = renderHook(() =>
      useCounter({minValue, isCountdown: true, maxValue}),
    );

    act(() => {
      result.current[1](minValue);
    });

    expect(result.current[0]).toBe(minValue);

    act(() => {
      result.current[1](-1);
    });

    expect(result.current[0]).toBe(maxValue);
  });
});
