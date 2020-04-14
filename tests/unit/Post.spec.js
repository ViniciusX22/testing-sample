import { shallowMount } from "@vue/test-utils";
import Post from "@/components/Post.vue";

describe("Post.vue", () => {
  const post = {
    userId: 1,
    title: "Post title",
    body: "Post long body",
    id: 4
  };

  it("renders post title and body", () => {
    const wrapper = shallowMount(Post, {
      propsData: { post }
    });
    expect(wrapper.find("[data-testid=title]").text()).toEqual(post.title);
    expect(wrapper.find("[data-testid=body]").text()).toEqual(post.body);
  });

  it("shows edit form when edit button is clicked", async () => {
    const wrapper = shallowMount(Post, {
      propsData: { post }
    });

    wrapper.find("[data-testid=edit]").trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.find("[data-testid=edit-form]").isVisible()).toBe(true);
    expect(wrapper.find("[data-testid=edit-title]").element.value).toEqual(
      post.title
    );
    expect(wrapper.find("[data-testid=edit-body]").element.value).toEqual(
      post.body
    );
  });

  it("calls save() when edit form save button is clicked", async () => {
    const mockedSave = jest.fn();
    const wrapper = shallowMount(Post, {
      propsData: { post },
      methods: {
        save: mockedSave
      }
    });

    wrapper.find("[data-testid=edit]").trigger("click");
    await wrapper.vm.$nextTick();

    wrapper.find("[data-testid=edit-save]").trigger("click");
    await wrapper.vm.$nextTick();

    expect(mockedSave).toHaveBeenCalled();
  });

  it("emits remove event with post id when remove button is clicked", async () => {
    const wrapper = shallowMount(Post, {
      propsData: { post }
    });

    wrapper.find("[data-testid=remove]").trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted("remove")).toBeTruthy();
    expect(wrapper.emitted("remove")[0]).toEqual([post.id]);
  });
});
