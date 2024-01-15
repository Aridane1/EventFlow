// server side script fetching remote data and preparing report data source
const http = require("http");

// call remote http rest api
function fetchLocations() {
  return new Promise((resolve, reject) => {
    http.get(
      "http://localhost:8080/api/locations/count-localizaciones",
      (result) => {
        let str = "";
        result.on("data", (chunk) => {
          str += chunk;
        });
        result.on("error", (err) => {
          reject(err);
        });
        result.on("end", () => {
          try {
            const parsedData = JSON.parse(str);

            if (parsedData && parsedData.localizaciones) {
              resolve(parsedData.localizaciones);
            } else {
              reject(
                new Error("El formato de la respuesta no es el esperado.")
              );
            }
          } catch (error) {
            reject(error);
          }
        });
      }
    );
  });
}

// group the data for report
async function prepareDataSource() {
  try {
    const locations = await fetchLocations();
    const source = locations.map((location) => ({
      name: location.name,
      numEvents: location.numEvento,
    }));
    return source;
  } catch (error) {
    console.error("Error al obtener ubicaciones:", error.message);
    throw error;
  }
}

// add jsreport hook which modifies the report input data
async function beforeRender(req, res) {
  req.data.locations = await prepareDataSource();
}
