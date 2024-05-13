import { reactive } from "vue";

export const store = reactive({
  apiKey: "cXFRhnBAXKnWWIK6455uRtxFdwAGvyV2",

  searchInput: "",

  lat: "",
  lon: "",
  radiusMt: "",
  radius: 5,

  test: "prova",
  n_room: null,
  n_bathroom: null,
  n_bed: null,
  square_meters: null,
  floor: null,

  suggestions: [],
  suggestionVisibility: false,
  apartments: [],
  pagLinks: [],
  totalPage: 0,
  paginationBaseURL: "",
});
