const Post = require('../models/post');


test('creates a user object', () => {
    const post = new Post();
  
    expect(post.id).toBeNull;
    expect(post.title).toBe(expect.String);
    expect(post.post_url).toBe(expect.String);
    expect(post.user_id).toBe(expect.Number);
});