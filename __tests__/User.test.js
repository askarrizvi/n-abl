const User = require('../models/user');

test('creates a user object', () => {
    const user = new User();
    
    expect(user.id).toBeNull;
    expect(user.username).toBe(expect.String);
    expect(user.email).toBe(expect.String);
    expect(user.password).toBe(expect.String);
});

test('checks user values', () => {
    const user = new User({id: 1, username: 'Scott', email: 'myemail', password: 'mypassword'});

    expect(user.id).toBe(1);
    expect(user.username).toBe('Scott');
    expect(user.email).toBe('myemail');
    expect(user.password).toBe('mypassword');
});