export default class PostService {
  baseURL = "https://jsonplaceholder.typicode.com/posts";

  async get() {
    return fetch(this.baseURL).then(res =>
      res.ok ? res.json() : Promise.reject(res)
    );
  }

  async put(post) {
    return fetch(`${this.baseURL}/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        title: post.title,
        body: post.body,
        userId: post.userId
      })
    }).then(res => (res.ok ? res.json() : Promise.reject(res)));
  }

  async delete(id) {
    return fetch(`${this.baseURL}/${id}`).then(res =>
      res.ok ? res.json() : Promise.reject(res)
    );
  }
}
