/**
 * Define Place model with properties of each node
 */
module.exports = {
  labels: ["Place"],

  name: {
    type: "string",
    required: true,
    index: true,
  },
  lat: "float",
  lng: "float",
  unique_point: "string",

  // relationship with Trips
};
