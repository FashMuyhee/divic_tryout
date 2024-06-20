import React from 'react';

export const useToggle = (status: boolean = false): [boolean, () => void] => {
  const [isToggled, setToggle] = React.useState(status);

  const onToggle = () => setToggle(!isToggled);

  return [isToggled, onToggle];
};
