import * as contentful from "contentful";

const API_SPACE_ID = process.env.REACT_APP_CONTENTFUL_API_SPACE_ID;
const API_TOKEN = process.env.REACT_APP_CONTENTFUL_API_TOKEN;
const client = contentful.createClient({
  space: API_SPACE_ID,
  accessToken: API_TOKEN,
});

export const dateAsInt = (dateStr) => new Date(dateStr).getTime();

export const getContentfulAssets = async (assetId) => {
  try {
    const data = await client.getAsset(assetId);
    return "https:" + data.fields.file.url;
  } catch (e) {
    return false;
  }
};

export const getVideoAds = async () => {
  try {
    const videoAds = await client.getEntries({
      content_type: "videoAdsListing",
    });

    if (videoAds) {
      return videoAds.items[0] ?? [];
    } else {
      console.error("cannot fetching main banners");
    }
  } catch (e) {
    return false;
  }
};
