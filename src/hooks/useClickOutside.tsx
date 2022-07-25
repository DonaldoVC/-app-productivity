import {MutableRefObject, useEffect, useState} from "react";

/**
 * Hook to valid when someone clicked outside of something.
 *
 * @param node The object ref
 * @param initial Optional initial value (default false)
 */
const useClickOutside: useClickOutside = (node: MutableRefObject<any>, initial: boolean = false) => {
  const [show, setShow] = useState(initial)

  const handleClick = (e: any) => {
    const currentNode: any = node && node.current;
    if (currentNode && currentNode.contains(e.target)) return;
    setShow(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [show]);

  return [show, setShow];
}

export default useClickOutside;
