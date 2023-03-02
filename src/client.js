import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = import.meta.env.VITE_REACT_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_REACT_SANITY_DATASET; // "production"
// const apiVersion = import.meta.env.VITE_REACT_SANITY_API_VERSION; // "2022-11-16"
const token = import.meta.env.VITE_REACT_SANITY_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2021-08-31",
  useCdn: false,
  token,
  ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
