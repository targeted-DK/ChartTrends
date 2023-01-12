import Fred from 'node-fred';
const API_KEY = "c4c4022663dafa850bc174cd583b0579";
const fred = new Fred(API_KEY);

function getCategory(categoryID) {
    fred.categories.getCategory(125)
      .then((res) => {
        console.log('Category', res);
      })
      .catch((err) => {
        console.error('Error', err);
      });
  }
  getCategory(125);