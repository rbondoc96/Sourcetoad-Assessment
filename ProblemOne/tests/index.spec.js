const {mutateArray} = require('../index');
const _ = require('lodash');

describe('Step 2 Tests', function() {
    test('Flatten array in given format then reduce some_array', function() {
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
        ];
        const target = [
            {
                'guest_type': 'crew',
                'first_name': 'Marco',
                'last_name': 'Burns',
                'room_no': 'A0073',
                'some_total': 13
            },
            {
                'guest_type': 'guest',
                'first_name': 'John',
                'last_name': 'Doe',
                'room_no': 'C73',
                'some_total': 18
            },        
        ];
    
        const result = mutateArray(data)

        console.log(result)
    
        expect(_.isEqual(target, result))
            .toBe(true);    
    });
    
    test('Flatten array with more nested objects then reduce some_array', () => {
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
        ];
        const target = [
            {
                'guest_type': 'crew',
                'first_name': 'Marco',
                'last_name': 'Burns',
                'room_no': 'A0073',
                'some_total': 13, 
                'card_type': 'Visa',
                'zipcode': '92108'
            },
            {
                'guest_type': 'guest',
                'first_name': 'John',
                'last_name': 'Doe',
                'room_no': 'C73',
                'some_total': 18,
                'card_type': 'Mastercard',
                'zipcode': '77006'            
            },        
        ];
    
        const result = mutateArray(data);
        console.log(result)

        expect(_.isEqual(target, result))
            .toBe(true);
    });
});
