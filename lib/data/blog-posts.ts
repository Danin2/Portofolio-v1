import { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Optimizing Database Queries: A Case Study',
    slug: 'optimizing-database-queries',
    excerpt: 'How I reduced API response time from 2s to 200ms by optimizing database queries and adding proper indexing.',
    content: `
# Optimizing Database Queries: A Case Study

## The Problem

Our API endpoints were slow. Users complained about 2-3 second load times. After profiling, I found the bottleneck: inefficient database queries.

## Initial Investigation

Using PostgreSQL's \`EXPLAIN ANALYZE\`, I discovered several issues:

\`\`\`sql
EXPLAIN ANALYZE SELECT * FROM orders 
WHERE user_id = 123 
AND status = 'pending';
\`\`\`

**Results:**
- Sequential scan on 500K rows
- No indexes on \`user_id\` or \`status\`
- Query time: 1.8s

## Solution 1: Add Indexes

\`\`\`sql
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
\`\`\`

**Result:** Query time reduced to 45ms ✅

## Solution 2: Select Only Needed Columns

**Before:**
\`\`\`javascript
const orders = await db.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
\`\`\`

**After:**
\`\`\`javascript
const orders = await db.query(
  'SELECT id, order_number, total, status FROM orders WHERE user_id = $1',
  [userId]
);
\`\`\`

**Result:** Reduced data transfer by 70% ✅

## Solution 3: Implement Pagination

\`\`\`javascript
const limit = 20;
const offset = (page - 1) * limit;

const orders = await db.query(
  'SELECT id, order_number, total, status 
   FROM orders 
   WHERE user_id = $1 
   ORDER BY created_at DESC
   LIMIT $2 OFFSET $3',
  [userId, limit, offset]
);
\`\`\`

## Final Results

- **Before:** 2000ms average response time
- **After:** 200ms average response time
- **Improvement:** 90% faster! 🚀

## Key Takeaways

1. Always use \`EXPLAIN ANALYZE\` to profile queries
2. Add indexes on frequently queried columns
3. Select only columns you need
4. Implement pagination for large datasets
5. Monitor query performance in production

## Tools Used

- PostgreSQL
- pg_stat_statements extension
- DataDog for monitoring
    `,
    category: 'Case Study',
    tags: ['PostgreSQL', 'Performance', 'Optimization', 'SQL'],
    author: 'Backend Developer',
    publishedAt: '2024-03-15',
    readingTime: 8,
    featured: true,
  },
  {
    id: '2',
    title: 'Understanding the N+1 Query Problem',
    slug: 'understanding-n-plus-one-query-problem',
    excerpt: 'A deep dive into one of the most common performance issues in backend applications and how to fix it.',
    content: `
# Understanding the N+1 Query Problem

## What is N+1 Query Problem?

The N+1 query problem occurs when your application makes 1 query to fetch a list of items, then makes N additional queries to fetch related data for each item.

## Example Scenario

Let's say you want to display a list of blog posts with their authors:

\`\`\`javascript
// Fetch all posts (1 query)
const posts = await db.query('SELECT * FROM posts LIMIT 10');

// For each post, fetch the author (N queries)
for (const post of posts) {
  const author = await db.query(
    'SELECT * FROM users WHERE id = $1',
    [post.author_id]
  );
  post.author = author;
}
\`\`\`

**Total queries:** 1 + 10 = 11 queries ❌

## Why is This Bad?

- Each query has network latency
- Database connections are expensive
- Slow response times
- Increased server load

## Solution 1: Use JOIN

\`\`\`javascript
const postsWithAuthors = await db.query(\`
  SELECT 
    posts.*,
    users.name as author_name,
    users.email as author_email
  FROM posts
  LEFT JOIN users ON posts.author_id = users.id
  LIMIT 10
\`);
\`\`\`

**Total queries:** 1 query ✅

## Solution 2: Use IN Clause (Eager Loading)

\`\`\`javascript
// Fetch posts
const posts = await db.query('SELECT * FROM posts LIMIT 10');

// Extract all author IDs
const authorIds = posts.map(p => p.author_id);

// Fetch all authors in one query
const authors = await db.query(
  'SELECT * FROM users WHERE id = ANY($1)',
  [authorIds]
);

// Map authors to posts in application code
const authorMap = new Map(authors.map(a => [a.id, a]));
posts.forEach(post => {
  post.author = authorMap.get(post.author_id);
});
\`\`\`

**Total queries:** 2 queries ✅

## Solution 3: Use DataLoader (Node.js)

\`\`\`javascript
import DataLoader from 'dataloader';

const userLoader = new DataLoader(async (userIds) => {
  const users = await db.query(
    'SELECT * FROM users WHERE id = ANY($1)',
    [userIds]
  );
  return userIds.map(id => users.find(u => u.id === id));
});

// Usage
const posts = await db.query('SELECT * FROM posts LIMIT 10');
for (const post of posts) {
  post.author = await userLoader.load(post.author_id);
}
\`\`\`

DataLoader batches all requests automatically! ✅

## When to Use Each Solution

- **JOIN:** Simple relationships, always need related data
- **IN Clause:** Complex logic, conditional loading
- **DataLoader:** GraphQL APIs, multiple sources

## Key Takeaway

Always be aware of how many database queries your code generates. Use database profiling tools to catch N+1 problems early!
    `,
    category: 'Tutorial',
    tags: ['Performance', 'SQL', 'Best Practices', 'Node.js'],
    author: 'Backend Developer',
    publishedAt: '2024-03-10',
    readingTime: 6,
    featured: true,
  },
  {
    id: '3',
    title: 'REST API Design Best Practices',
    slug: 'rest-api-design-best-practices',
    excerpt: 'Essential principles for designing clean, intuitive, and maintainable REST APIs.',
    content: `
# REST API Design Best Practices

## 1. Use Proper HTTP Methods

\`\`\`
GET    /users        - Get all users
GET    /users/123    - Get specific user
POST   /users        - Create new user
PUT    /users/123    - Update entire user
PATCH  /users/123    - Partial update
DELETE /users/123    - Delete user
\`\`\`

## 2. Use Plural Nouns for Resources

✅ **Good:**
\`\`\`
/users
/posts
/comments
\`\`\`

❌ **Bad:**
\`\`\`
/user
/getUsers
/createPost
\`\`\`

## 3. Nest Resources for Relationships

\`\`\`
GET /users/123/posts           - Get posts by user 123
GET /posts/456/comments        - Get comments for post 456
POST /users/123/posts          - Create post for user 123
\`\`\`

## 4. Use Query Parameters for Filtering

\`\`\`
GET /users?status=active
GET /posts?category=tech&limit=10
GET /products?minPrice=100&maxPrice=500
\`\`\`

## 5. Version Your API

\`\`\`
/api/v1/users
/api/v2/users
\`\`\`

Or use headers:
\`\`\`
Accept: application/vnd.api+json;version=1
\`\`\`

## 6. Use Proper Status Codes

- **200 OK** - Success
- **201 Created** - Resource created
- **204 No Content** - Success, no body
- **400 Bad Request** - Invalid input
- **401 Unauthorized** - Authentication required
- **403 Forbidden** - Not allowed
- **404 Not Found** - Resource doesn't exist
- **500 Internal Server Error** - Server error

## 7. Implement Pagination

\`\`\`json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "perPage": 20,
    "total": 150,
    "totalPages": 8
  }
}
\`\`\`

## 8. Provide Consistent Error Responses

\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
\`\`\`

## 9. Use HATEOAS (Optional)

\`\`\`json
{
  "id": 123,
  "name": "John Doe",
  "links": {
    "self": "/users/123",
    "posts": "/users/123/posts",
    "friends": "/users/123/friends"
  }
}
\`\`\`

## 10. Document Your API

Use tools like:
- Swagger/OpenAPI
- Postman Collections
- API Blueprint

## Example: Complete User API

\`\`\`javascript
// GET /api/v1/users?page=1&limit=20
router.get('/users', async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  
  const users = await User.findAll({
    limit: parseInt(limit),
    offset: (page - 1) * limit,
  });
  
  const total = await User.count();
  
  res.json({
    data: users,
    pagination: {
      page: parseInt(page),
      perPage: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// POST /api/v1/users
router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ data: user });
  } catch (error) {
    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: error.message,
      },
    });
  }
});
\`\`\`

## Summary

Good API design makes your API:
- Easy to understand
- Easy to use
- Easy to maintain
- Predictable behavior

Follow these principles and your API consumers will thank you! 🎉
    `,
    category: 'Best Practices',
    tags: ['REST API', 'Design', 'Best Practices', 'HTTP'],
    author: 'Backend Developer',
    publishedAt: '2024-03-05',
    readingTime: 10,
    featured: true,
  },
  {
    id: '4',
    title: '5 Essential Security Practices for APIs',
    slug: 'api-security-practices',
    excerpt: 'Protect your APIs with these fundamental security measures every backend developer should implement.',
    content: `
# 5 Essential Security Practices for APIs

## 1. Always Use HTTPS

Never send sensitive data over HTTP. Always use HTTPS to encrypt data in transit.

\`\`\`javascript
// Express.js force HTTPS
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(\`https://\${req.header('host')}\${req.url}\`);
  } else {
    next();
  }
});
\`\`\`

## 2. Implement Rate Limiting

Prevent abuse and DDoS attacks:

\`\`\`javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
});

app.use('/api/', limiter);
\`\`\`

## 3. Validate and Sanitize Input

Never trust user input:

\`\`\`javascript
import Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  age: Joi.number().min(18).max(120),
});

router.post('/users', (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  
  // Proceed with validated data
});
\`\`\`

## 4. Use JWT with Short Expiry

\`\`\`javascript
import jwt from 'jsonwebtoken';

// Generate token
const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '1h' } // Short expiry
);

// Verify token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
\`\`\`

## 5. Implement CORS Properly

Don't allow all origins:

\`\`\`javascript
import cors from 'cors';

// ❌ Bad: Allow all origins
app.use(cors());

// ✅ Good: Specific origins only
app.use(cors({
  origin: ['https://myapp.com', 'https://admin.myapp.com'],
  credentials: true,
}));
\`\`\`

## Bonus: SQL Injection Prevention

Always use parameterized queries:

\`\`\`javascript
// ❌ Bad: Vulnerable to SQL injection
const user = await db.query(
  \`SELECT * FROM users WHERE email = '\${req.body.email}'\`
);

// ✅ Good: Parameterized query
const user = await db.query(
  'SELECT * FROM users WHERE email = $1',
  [req.body.email]
);
\`\`\`

## Summary Checklist

- [ ] HTTPS everywhere
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] JWT with short expiry times
- [ ] CORS configured properly
- [ ] Parameterized queries for SQL
- [ ] Passwords hashed with bcrypt
- [ ] Environment variables for secrets
- [ ] Security headers (helmet.js)
- [ ] Regular security audits

Stay secure! 🔐
    `,
    category: 'Best Practices',
    tags: ['Security', 'API', 'JWT', 'Best Practices'],
    author: 'Backend Developer',
    publishedAt: '2024-02-28',
    readingTime: 7,
    featured: false,
  },
  {
    id: '5',
    title: 'Caching Strategies with Redis',
    slug: 'caching-strategies-redis',
    excerpt: 'Learn different caching patterns and when to use each one for optimal performance.',
    content: `
# Caching Strategies with Redis

## Why Cache?

- Reduce database load
- Faster response times
- Better user experience
- Lower costs

## Strategy 1: Cache-Aside (Lazy Loading)

Most common pattern. Application is responsible for reading and writing to cache.

\`\`\`javascript
async function getUser(userId) {
  // Try cache first
  const cached = await redis.get(\`user:\${userId}\`);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Cache miss - fetch from DB
  const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
  
  // Store in cache
  await redis.setex(\`user:\${userId}\`, 3600, JSON.stringify(user));
  
  return user;
}
\`\`\`

**When to use:** Read-heavy workloads

## Strategy 2: Write-Through

Write to cache and database simultaneously.

\`\`\`javascript
async function updateUser(userId, data) {
  // Update database
  await db.query('UPDATE users SET name = $1 WHERE id = $2', [data.name, userId]);
  
  // Update cache
  const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
  await redis.setex(\`user:\${userId}\`, 3600, JSON.stringify(user));
  
  return user;
}
\`\`\`

**When to use:** Data consistency is critical

## Strategy 3: Write-Behind

Write to cache immediately, sync to database later.

\`\`\`javascript
async function createOrder(orderData) {
  const orderId = generateId();
  
  // Write to cache immediately
  await redis.setex(\`order:\${orderId}\`, 3600, JSON.stringify(orderData));
  
  // Queue for database write (async)
  await queue.add('save-order', { orderId, orderData });
  
  return orderId;
}
\`\`\`

**When to use:** High write throughput needed

## Strategy 4: Cache Invalidation

\`\`\`javascript
async function deleteUser(userId) {
  // Delete from database
  await db.query('DELETE FROM users WHERE id = $1', [userId]);
  
  // Invalidate cache
  await redis.del(\`user:\${userId}\`);
  
  // Also invalidate related caches
  await redis.del(\`user:\${userId}:posts\`);
  await redis.del(\`user:\${userId}:friends\`);
}
\`\`\`

## Pro Tips

### 1. Set Expiration Times

\`\`\`javascript
// Short TTL for frequently changing data
await redis.setex('stock:AAPL', 60, price);

// Long TTL for static data
await redis.setex('config:app', 86400, config);
\`\`\`

### 2. Use Redis Hashes for Objects

\`\`\`javascript
// Instead of storing JSON string
await redis.hset('user:123', {
  name: 'John',
  email: 'john@example.com',
  age: 30,
});

// Get specific fields
const name = await redis.hget('user:123', 'name');
\`\`\`

### 3. Implement Cache Warming

\`\`\`javascript
// Pre-populate cache on startup
async function warmCache() {
  const popularPosts = await db.query(
    'SELECT * FROM posts ORDER BY views DESC LIMIT 100'
  );
  
  for (const post of popularPosts) {
    await redis.setex(\`post:\${post.id}\`, 3600, JSON.stringify(post));
  }
}
\`\`\`

## Common Pitfalls

1. **Cache Stampede**: Multiple requests hitting DB when cache expires
   - Solution: Use mutex/locks

2. **Stale Data**: Cache not invalidated when data changes
   - Solution: Set appropriate TTL, implement cache invalidation

3. **Cache Penetration**: Requests for non-existent data bypass cache
   - Solution: Cache null results with short TTL

## Summary

Choose caching strategy based on:
- Read/write ratio
- Data consistency requirements
- Performance needs
- System complexity tolerance

Start simple with cache-aside, optimize later! 🚀
    `,
    category: 'Tutorial',
    tags: ['Redis', 'Caching', 'Performance', 'Node.js'],
    author: 'Backend Developer',
    publishedAt: '2024-02-20',
    readingTime: 9,
    featured: false,
  },
];

// Helper functions
export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(blogPosts.map(post => post.category)));
};

export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => 
      post.id !== currentPost.id && 
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
};