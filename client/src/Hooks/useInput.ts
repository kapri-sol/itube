import { useState } from "react";

export default defaultValue => {
  const [value, setValue] = useState(defaultValue);

  const onChange = e => {
    const {
      // tslint:disable-next-line:no-shadowed-variable
      target: { value }
    } = e;
    setValue(value);
  };

  return { value, onChange, setValue };
};
