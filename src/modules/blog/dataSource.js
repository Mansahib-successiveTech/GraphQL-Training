export let users = [
  { id: "1", name: "Mansahib Singh", email: "mansahib@example.com",password:"123",isOnline: false },
  { id: "2", name: "John Doe", email: "john@example.com",password:"1234",isOnline: false }
];

export let posts = [
  { id: "101", title: "GraphQL Basics", content: "Intro to GraphQL", authorId: "1" },
  { id: "102", title: "Advanced GraphQL", content: "Deep dive into GraphQL", authorId: "2" }
];

export let comments = [
  { id: "1001", text: "Great post!", postId: "101", authorId: "2" },
  { id: "1002", text: "Thanks for sharing!", postId: "102", authorId: "1" }
];
