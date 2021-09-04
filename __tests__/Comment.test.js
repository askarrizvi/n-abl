const Comment = require('../models/comment');

test('creates a comment object', () => {
    const comment = new Comment();
    
    expect(comment.id).toBeNull;
    expect(comment.comment_text).toBe(expect.String);
    expect(comment.user_id).toBe(expect.Number);
    expect(comment.post_id).toBe(expect.Number);
});
