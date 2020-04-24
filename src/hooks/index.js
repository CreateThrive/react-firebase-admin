const useChangeHandler = setState => {
  const onChangeHandler = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    setState(prevState => ({ ...prevState, [`${name}`]: value }));
  };

  return onChangeHandler;
};

export { useChangeHandler };
