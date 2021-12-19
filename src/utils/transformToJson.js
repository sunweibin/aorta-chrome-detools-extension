export default function transformToJson(data, key) {
  let jsonData = {};
  try {
    jsonData = JSON.parse(data[key]);
  } catch (error) {
    jsonData = {};
    console.error(`JsonViewer data.${key} is not JSON String`, data);
  }

  return jsonData;
}
