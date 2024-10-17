<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 26 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.0004 14.881L17.7623 19.7703L22.5242 14.881M13.0004 10.1191L8.23847 5.35718M8.23847 5.35718L3.47656 10.1155M8.23847 5.35718V19.6429M17.7623 5.35718V19.6429"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
      
      <script>
export default {
  name: "SortIcon",
  props: {
    size: {
      type: Number,
      default: 25,
    },
  },
};
</script>
      