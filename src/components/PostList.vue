<template>
  <div class="wrapper">
    <Post
      v-for="post in posts"
      :post="post"
      @remove="removePost"
      :key="post.id"
    />
  </div>
</template>

<script>
import PostService from "@/services/PostService";
import Post from "@/components/Post";

export default {
  name: "PostList",
  components: { Post },
  data() {
    return {
      posts: []
    };
  },
  methods: {
    fetchPosts() {
      let postService = new PostService();
      postService.get().then(posts => (this.posts = posts));
    },
    removePost(id) {
      let postService = new PostService();
      postService.delete(id).then(() => {
        this.posts = this.posts.filter(post => post.id !== id);
      });
    }
  },
  mounted() {
    this.fetchPosts();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
