import { shallowMount } from "@vue/test-utils";
import HelloVue from "@/components/HelloVue.vue";

describe("HelloVue.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "hello, world";
    const wrapper = shallowMount(HelloVue, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
