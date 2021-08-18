module.exports = {
  labels: ["Itinerary"],

  title: {
    type: "string",
  },

  numberOfItems: {
    type: integer,
  },
  itemListElement: {
    type: integer,
  },

  // init relationship
  has: {
    type: "relationship",
    relationship: "BELONGS_TO",
    direction: "in",
    target: "Trip",
  },
};
