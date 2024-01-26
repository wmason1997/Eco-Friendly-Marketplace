module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },

  'lt': function (a, b) {
    return a < b;
  },

 jsonHelper(context) {
  return JSON.stringify(context)
  }

};
