import { useEffect, useMemo, useState } from "react";

export const UseMemoExample = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  // 这样用 useEffect 去代替 useMemo 不是也能达到持久化记忆数据的效果吗？无非就是多了一次 setXXX 所造成的渲染
  // const [num, setNum] = useState("0");
  // const [num2, setNum2] = useState("0");

  // const sum = useMemo(() => {
  //   const n = parseInt(num, 10);
  //   return fibonacci(n);
  // }, [num]);

  // useEffect(() => {
  //   const n = parseInt(num, 10);
  //   setNum2(fibonacci(n));
  // }, [num]);

  // 这里useMemo的依赖参数是count，因此count每次变化的时候，useMemo就会跟着变，那么如果第二个参数是一个固定值，或者其他变量的话，useMemo就不会在每次重新render的时候执行了，同理与useCallback
  const initCount = useMemo(() => {
    console.log("执行useMemo", count);
    return count + 1;
  }, [count]);

  useEffect(() => {
    setCount2(count);
    console.log("执行useEffect");
  }, [count]);

  return (
    <div>
      <p>count {count}</p>
      <p>count2 {count2}</p>
      <p>initCount {initCount}</p>
      <button onClick={() => setCount(() => count + 1)}>click</button>
    </div>
  );
};
