export function formatDate(d) {
  const date = new window.Date(d);
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return (d = yyyy + '/' + mm + '/' + dd);
}

export  function agoDate(ago) {
  var today = new window.Date();
  var pastDate =  today.getDate() / ago;
  today.setDate(pastDate);

  var dd =  today.getDate();
  var mm =  today.getMonth() + 1;

  var yyyy =  today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  var day = yyyy + '/' + mm + '/' + dd;

  return  day;
}

export function currentDate() {
  var today = new window.Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  var today = yyyy + '/' + mm + '/' + dd;

  return today;
}
