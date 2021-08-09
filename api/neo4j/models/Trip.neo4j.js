module.exports = {
  labels: ["Trip"],

  title: {
    type: "name",
  },
  startDate: {
    type: "date",
  },
  endDate: {
    type: "date",
  },
  // notes

  // relationship [:HAS] -> {Places, Accomms, Restaurant}
  has: {
    type: "relationship",
    relationship: "HAS",
    direction: "out",
    target: "Place",
    eager: true,
  },
};
