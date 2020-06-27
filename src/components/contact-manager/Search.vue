<template>
  <div class="search-box form-group">
    <input
      type="text"
      name="search"
      id="search"
      :value="query"
      @input="function(event) { return $emit('change', event) }"
      class="form-control"
      placeholder="Search by name or email"
    />
  </div>
</template>

<script type="text/javascript">
export default {
  name: "Search",
  props: {
    query: String,
  },
};
</script>