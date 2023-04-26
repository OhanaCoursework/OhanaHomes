export function getTimeSpecificMessage() {
  const hourOfDay = new Date().getHours();

  if (hourOfDay < 12) {
    return "Good morning, \n";
  } else if (hourOfDay < 18) {
    return "Good afternoon, \n";
  } else {
    return "Good evening, \n";
  }
}