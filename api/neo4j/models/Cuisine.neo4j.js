/**
 * Define Cuisine model with properties of each node
 */
module.exports = {
  labels: ["Cuisine"],

  name: {
    type: "string",
    required: true,
    index: true,
  },
  lat: "float",
  lng: "float",
  unique_point: "string",

  distance_to: {
    type: "relationship",
    target: "Accommodation",
    relationship: "DISTANCE_TO",
    direction: "in",
    properties: {
      distance: "float",
    },
  },
};
