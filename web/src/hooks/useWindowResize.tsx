import { useEffect, useState } from "react";

import debounce from "../utils/debounce";

export const useWindowResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const debouncedResizeHandler = debounce(() => {
      setWidth(window.innerWidth);
    }, 100);

    window.addEventListener("resize", debouncedResizeHandler);
    return () => window.removeEventListener("resize", debouncedResizeHandler);
  }, []);

  return width;
};
