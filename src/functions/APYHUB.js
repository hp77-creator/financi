export let API_Token = "APT0hzXHLr0PRW1z82ihacE7q7SnVaOXF8qG2ce0G82PBBmqPEse";
export const APYHUB_Bar_Request = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(
        "https://api.apyhub.com/generate/charts/bar/file?output=sample.png",

        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "apy-token": "APT0hzXHLr0PRW1z82ihacE7q7SnVaOXF8qG2ce0G82PBBmqPEse",
          },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        let data = await response.json();

        resolve(data);
      } else {
        reject(response);
      }
    } catch (error) {
      reject(error);
    }
  });
};
