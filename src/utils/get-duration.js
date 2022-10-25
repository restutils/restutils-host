const getDuration = (start, end) => {

  let diff = end.getTime() - start.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);

  const mins = Math.floor(diff / (1000 * 60));
  diff -= mins * (1000 * 60);

  const seconds = Math.floor(diff / (1000));
  diff -= seconds * (1000);

  return [
    `${days}`.padStart(2, '0'),
    `${hours}`.padStart(2, '0'),
    `${mins}`.padStart(2, '0'),
    `${seconds}`.padStart(2, '0')
  ].join(':');
};

module.exports = getDuration;
