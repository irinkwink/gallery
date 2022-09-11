const formatDate = date => {
  const d = Date.parse(date);
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('ru', options)
    .format(new Date(d));
};

export default formatDate;
