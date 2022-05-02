const {mutateArray} = require('../index');
const _ = require('lodash');

describe('Step 3 Tests', function() {
    test('Flatten array in given format, reduce some_array, see only guests', function() {
        const data = [
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
        const target = [
            {
                'guest_type': 'guest',
                'first_name': 'John',
                'last_name': 'Doe',
                'room_no': 'C73',
                'some_total': 18
            },
            {
                'guest_type': 'guest',
                'first_name': 'Jane',
                'last_name': 'Doe',
                'room_no': 'C73',
                'some_total': 18,
            },
            {
                'guest_type': 'guest',
                'first_name': 'Albert',
                'last_name': 'Einstein',
                'room_no': 'B15',
                'some_total': 16
            },
            {
                'guest_type': 'guest',
                'first_name': 'Alan',
                'last_name': 'Turing',
                'room_no': 'B15',
                'some_total': 16
            },                     
        ];
    
        const result = mutateArray(data)    
        expect(_.isEqual(target, result))
            .toBe(true);    
    });
    
    test('Flatten array with more nested objects, reduce some_array, see only guests', function() {
        const data = [
            {
                'guest_type': 'crew',
                'first_name': 'Marco',
                'last_name': 'Burns',
                'guest_booking': {
                    'room_no': 'A0073',
                    'some_array': [7,2,4],
                    'payment': {
                        'card_type': 'Visa',
                        'zipcode': '92108'
                    }
                },
            },
            {
                'guest_type': 'guest',
                'first_name': 'John',
                'last_name': 'Doe',
                'guest_booking': {
                    'room_no': 'C73',
                    'some_array': [1,3,5,2,4,3],
                    'payment': {
                        'card_type': 'Mastercard',
                        'zipcode': '77006'
                    }
                },
            },
            {
                'guest_type': 'guest',
                'first_name': 'Jane',
                'last_name': 'Doe',
                'guest_booking': {
                    'room_no': 'C73',
                    'some_array': [1,3,5,2,4,3],
                    'payment': {
                        'card_type': 'Mastercard',
                        'zipcode': '77006'
                    }                    
                },
            },
            {
                'guest_type': 'guest',
                'first_name': 'Albert',
                'last_name': 'Einstein',
                'guest_booking': {
                    'room_no': 'B15',
                    'some_array': [2,5,6,3],
                    'payment': {
                        'card_type': 'Visa',
                        'zipcode': '92115'
                    }                    
                },
            },
            {
                'guest_type': 'crew',
                'first_name': 'Jack',
                'last_name': 'Daniels',
                'guest_booking': {
                    'room_no': 'B15',
                    'some_array': [2,5,6,3],
                    'payment': {
                        'card_type': 'Visa',
                        'zipcode': '92115'
                    }
                },
            },
            {
                'guest_type': 'guest',
                'first_name': 'Alan',
                'last_name': 'Turing',
                'guest_booking': {
                    'room_no': 'B15',
                    'some_array': [2,5,6,3],
                    'payment': {
                        'card_type': 'Visa',
                        'zipcode': '92115'
                    }
                },
            },                    
        ];
        const target = [
            {
                'guest_type': 'guest',
                'first_name': 'John',
                'last_name': 'Doe',
                'room_no': 'C73',
                'some_total': 18,
                'card_type': 'Mastercard',
                'zipcode': '77006'            
            },
            {
                'guest_type': 'guest',
                'first_name': 'Jane',
                'last_name': 'Doe',
                'room_no': 'C73',
                'some_total': 18,
                'card_type': 'Mastercard',
                'zipcode': '77006'
            },
            {
                'guest_type': 'guest',
                'first_name': 'Albert',
                'last_name': 'Einstein',
                'room_no': 'B15',
                'some_total': 16,
                'card_type': 'Visa',
                'zipcode': '92115'
            },
            {
                'guest_type': 'guest',
                'first_name': 'Alan',
                'last_name': 'Turing',
                'room_no': 'B15',
                'some_total': 16,
                'card_type': 'Visa',
                'zipcode': '92115'
            },                     
        ];
    
        const result = mutateArray(data);
        expect(_.isEqual(target, result))
            .toBe(true);
    });
});
