import axios from "axios";

export default class PostService {
  baseURL = "https://jsonplaceholder.typicode.com/posts";

  get() {
    return axios.get(this.baseURL).then(res => res.data);
  }

  put(post) {
    return axios
      .put(
        `${this.baseURL}/${post.id}`,
        {
          title: post.title,
          body: post.body,
          userId: post.userId
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }
      )
      .then(res => res.data);
  }

  delete(id) {
    return axios.delete(`${this.baseURL}/${id}`);
  }
}
