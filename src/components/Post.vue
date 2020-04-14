<template>
  <div class="post" data-testid="post">
    <h1 class="post-title" data-testid="title">{{ value.title }}</h1>
    <p class="post-body" data-testid="body">{{ value.body }}</p>
    <div class="actions" v-if="!editing">
      <button @click="$emit('remove', value.id)" data-testid="remove">
        remove
      </button>
      <button @click="edit(true)" data-testid="edit">edit</button>
    </div>
    <div class="edit-form" data-testid="edit-form" v-else>
      <input
        type="text"
        placeholder="type the new title"
        name="title"
        v-model="title"
        data-testid="edit-title"
      />
      <textarea
        name="body"
        placeholder="type the new body"
        v-model="body"
        data-testid="edit-body"
      ></textarea>
      <div class="actions">
        <button @click="save" data-testid="edit-save">
          {{ this.loading ? "loading..." : "save" }}
        </button>
        <button @click="edit(false)" data-testid="edit-cancel">cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "@/services/PostService";

export default {
  name: "Post",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false,
      loading: false,
      title: "",
      body: "",
      value: {}
    };
  },
  methods: {
    save() {
      let postService = new PostService();
      this.loading = true;
      postService
        .put({ ...this.post, title: this.title, body: this.body })
        .then(post => {
          this.edit(false);
          this.value = post;
          this.loading = false;
        });
    },
    edit(isEditing) {
      this.editing = isEditing;
      if (isEditing) {
        this.body = this.post.body;
        this.title = this.post.title;
      }
    }
  },
  created() {
    this.value = this.post;
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;500&display=swap");

.post {
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  border: 1px solid grey;
  border-radius: 15px;
  background: rgb(248, 248, 248);
  cursor: pointer;
  max-width: 50rem;
}

.post:not(:first-of-type) {
  margin-top: 2rem;
}

.post:not(:last-of-type) {
  margin-bottom: 2rem;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 500;
}

.post-body {
  font-weight: 300;
}

.actions {
  display: flex;
  justify-content: flex-start;
}

.actions * {
  margin: 1rem;
}

.edit-form {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
