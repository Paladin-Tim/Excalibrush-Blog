import { useLayoutEffect, useState } from "react";

export const useInput = (defaultValue = "") => {
  const [value, setValue] = useState(defaultValue);

  useLayoutEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return {
    value,
    onChange: ({ target }) => setValue(target.value),
    clear: () => setValue(""),
  };
};
