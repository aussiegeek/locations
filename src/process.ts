import StreamZip from "node-stream-zip";
import papaparse from "papaparse";
import * as fs from "fs";

export async function process() {
  const zip = new StreamZip.async({ file: "AU.zip" });

  const data = await zip.entryData("AU.txt");

  const dataWithHeaders =
    "country	postalCode	placeName	regionName	regionShort	area	areaCode			latitude	longitude	accuracy\n" +
    data.toString();

  const result = papaparse.parse<{
    postalCode: string;
    placeName: string;
    regionShort: string;
    latitude: string;
    longitude: string;
  }>(dataWithHeaders, {
    header: true,
  });

  const processed = result.data.map((location) => {
    const { postalCode, placeName, regionShort } = location;
    return {
      postalCode,
      placeName,
      regionShort,
      latitude: Number.parseFloat(location.latitude),
      longitude: Number.parseFloat(location.longitude),
    };
  });

  fs.writeFileSync("au.json", JSON.stringify(processed));
}
