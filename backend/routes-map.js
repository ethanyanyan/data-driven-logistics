/**
 * This file is used to map all the routes on
 * the backend
 */

APIBASE = "/api/v1/";

let mapping = {
  [`${APIBASE}users/`]: require("./routes/users"),
  [`${APIBASE}companies/`]: require("./routes/companies"),
  [`${APIBASE}shipments/`]: require("./routes/shipments"),
  [`${APIBASE}roles/`]: require("./routes/roles"),
  [`${APIBASE}testing/`]: require("./routes/testing"),
  [`${APIBASE}location-types/`]: require("./routes/locationTypes"),
  [`${APIBASE}inventory/`]: require("./routes/inventory"),
  [`${APIBASE}products/`]: require("./routes/products"),
  [`${APIBASE}locations/`]: require("./routes/locations"),
  [`${APIBASE}business/`]: require("./routes/business"),
};

function applyMappingToApp(app) {
  for (const [route, handler] of Object.entries(mapping)) {
    app.use(route, handler);
  }
}

module.exports = applyMappingToApp;
