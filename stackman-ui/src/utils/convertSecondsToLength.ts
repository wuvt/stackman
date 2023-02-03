const convertSecondsToLength = (seconds: number): string => {
  return (
    Math.floor(seconds / 60).toString() +
    ':' +
    Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0')
      .toString()
  );
};

export default convertSecondsToLength;
