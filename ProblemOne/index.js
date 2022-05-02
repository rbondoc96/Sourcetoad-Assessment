var arr = [
  {
    'guest_type': 'crew',
    'first_name': 'Marco',
    'last_name': 'Burns',
    'guest_booking': {
        'room_no': 'A0073',
        'some_array': [7,2,4]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'John',
    'last_name': 'Doe',
    'guest_booking': {
        'room_no': 'C73',
        'some_array': [1,3,5,2,4,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Jane',
    'last_name': 'Doe',
    'guest_booking': {
        'room_no': 'C73',
        'some_array': [1,3,5,2,4,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Albert',
    'last_name': 'Einstein',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
  {
    'guest_type': 'crew',
    'first_name': 'Jack',
    'last_name': 'Daniels',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
  {
    'guest_type': 'guest',
    'first_name': 'Alan',
    'last_name': 'Turing',
    'guest_booking': {
        'room_no': 'B15',
        'some_array': [2,5,6,3]
    },
  },
];

function flattenObject(obj) {
  const flatObj = {};

  Object.keys(obj).forEach(function(key) {
      const value = obj[key];

      if(value && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(flatObj, flattenObject(value));
      } else {
        flatObj[key] = value;
      }
  });

  return flatObj;
}

function mutateArray(a) {
  for(let i = 0; i < a.length; i++) {
    if(typeof a[i] === 'object') {
      a[i] = flattenObject(a[i]);
    }

    const someArray = a[i]['some_array']
    if(someArray && Array.isArray(someArray)) {
      a[i]['some_total'] = someArray.reduce(function(prev, curr) {
        return prev + curr;
      }, 0);
      delete a[i]['some_array'];
    }
  }

  return a
    .filter(function(obj) {
      return obj['guest_type'] === 'guest';
    })
    .sort(function(A, B) {
      let result = A['last_name'].localeCompare(B['last_name']);
      return result !== 0 ? result : A['first_name'].localeCompare(B['first_name']);
    });
}

/**
 * Exports the function if testing it in Node
 * Performs browser actions otherwise
 */
const isNodeEnv = typeof process === 'object' && typeof window === 'undefined';
if(isNodeEnv) {
  module.exports = {mutateArray};
} else {
  $(document).ready(function() {
    $('#originalArray').html(JSON.stringify(arr, null, 2));
    $('#resultsArray').html(JSON.stringify(mutateArray(arr), null, 2));
  });
}