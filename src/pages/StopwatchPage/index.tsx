import {useCounter} from '@/shared/hooks';
import {useEffect} from 'react';
import {Text, SafeAreaView} from 'react-native';

export default function StopwatchPage() {
  const [counter, addToCounter] = useCounter();

  useEffect(() => {
    addToCounter(1);
  }, []);

  console.log(counter);

  return (
    <SafeAreaView>
      <Text>Stopwatch</Text>
    </SafeAreaView>
  );
}
