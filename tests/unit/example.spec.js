import { shallowMount } from "@vue/test-utils";
import HelloVue from "@/components/HelloVue";

describe("HelloVue.vue", () => {
  it("renders props.message when passed", () => {
    const message = "hello, world";
    const wrapper = shallowMount(HelloVue, {
      propsData: { message },
    });
    expect(wrapper.text()).toMatch(message);
  });
});
