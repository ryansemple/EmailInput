import { useEffect, useRef } from "react";

/**
 * Used to keep track of previous values of a state property.
 * 
 * @param value - the state property that you want to keep track 
 * of previous versions of.
 */
const usePrevious = <T extends {}>(value: T): T | undefined => {
	const ref: React.MutableRefObject<T | undefined> = useRef<T>();
	
  useEffect(() => {
    ref.current = value;
	});
	
  return ref.current;
};

export default usePrevious;