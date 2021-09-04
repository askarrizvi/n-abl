const Post = require('../models/post');


test('creates a post object', () => {
    const post = new Post();
  
    expect(post.id).toBeNull;
    expect(post.title).toBe(expect.String);
    expect(post.post_url).toBe(expect.String);
    expect(post.user_id).toBe(expect.Number);
});

test('checks for values', () => {
    const post = new Post({id: 1, title: 'Test', post_url: 'test.com', user_id: 1});
  
    expect(post.id).toBe(1);
    expect(post.title).toBe('Test');
    expect(post.post_url).toBe('test.com');
    expect(post.user_id).toBe(1);
});