const classnames = (
  ...classNames: readonly (string | Record<string, boolean>)[]
): string => {
  return classNames
    .flatMap((className) => {
      if (typeof className === 'string') {
        return className;
      } else {
        return Object.entries(className)
          .filter(([_, v]) => v)
          .map(([k, _]) => k);
      }
    })
    .join(' ');
};

export default classnames;
