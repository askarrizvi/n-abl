const Comment = require('../models/comment');

test('creates a comment object', () => {
    const comment = new Comment();
    
    expect(comment.id).toBeNull;
    expect(comment.comment_text).toBe(expect.String);
    expect(comment.user_id).toBe(expect.Number);
    expect(comment.post_id).toBe(expect.Number);
});

test('checks for values', () => {
    const comment = new Comment({id: 1, comment_text: 'This is a test', user_id: 1, post_id: 1});
    
    expect(comment.id).toBe(1);
    expect(comment.comment_text).toBe('This is a test');
    expect(comment.user_id).toBe(1);
    expect(comment.post_id).toBe(1);
});