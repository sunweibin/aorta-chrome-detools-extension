export default function getRespContent(id, data) {
  let jsonData;

  try {
    jsonData = JSON.parse(data);
  } catch (e) {
    jsonData = {};
    console.log('updateNetworkRspData JSON.parse catch err', data);
  }

  return {
    id,
    data: jsonData,
  };
}
