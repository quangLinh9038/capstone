/**
 * Define Accommodation model with properties of each node
 */
module.exports = {
  labels: ["Accommodation"],

  name: {
    type: "string",
    required: true,
    index: true,
  },
  lat: "float",
  lng: "float",
  unique_point: "float",
};
