/**
 * Define Place model with properties of each node
 */
module.exports = {
  labels: ["Place"],

  name: {
    type: "name",
    required: true,
    index: true,
  },
  lat: "float",
  lng: "float",
};
