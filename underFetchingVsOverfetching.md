# 🚀 How GraphQL Solves Over-Fetching and Under-Fetching

## 📌 Overview
When building APIs, **over-fetching** and **under-fetching** are two common inefficiencies:

**Over-fetching**: Fetching **more data than needed**.
**Under-fetching**: Fetching **less data than needed**, requiring **multiple requests**.

GraphQL was designed to solve these issues by allowing clients to request **exactly the data they need** in a single query.

---

## 1️⃣ Problem: Over-Fetching

### REST Example
```
http
GET /books/1
```
```
{
  "id": 1,
  "title": "1984",
  "author": "George Orwell",
  "published": 1949,
  "genre": "Dystopian",
  "reviews": [
    { "reviewer": "John", "rating": 5, "comment": "Amazing book!" },
    { "reviewer": "Alice", "rating": 4, "comment": "Great read." }
  ],
  "publisher": "Secker & Warburg",
  "ISBN": "123-456-789",
  "pageCount": 328
}
```
Issue: If the UI only needs the book title, we still receive all fields, increasing payload size unnecessarily.


GraphQL Solution
graphql

```
query {
  book(id: 1) {
    title
  }
}
```
Response:
```
{
  "data": {
    "book": {
      "title": "1984"
    }
  }
}
```
### 2. Problem: Under-Fetching
REST Example
Fetching a book and its reviews:

```
http
GET /books/1
```

```
http
GET /books/1/reviews
```
Issue: Requires two separate network requests to get all related data.

GraphQL Solution
graphql
```
query {
  book(id: 1) {
    title
    reviews {
      reviewer
      rating
    }
  }
}
```
Response:

```
{
  "data": {
    "book": {
      "title": "1984",
      "reviews": [
        { "reviewer": "John", "rating": 5 },
        { "reviewer": "Alice", "rating": 4 }
      ]
    }
  }
}
```