import * as dotenv from "dotenv";
import crawl from "./crawl";
import poller from "./poller";
dotenv.config();

const { INTERVAL_MS = Infinity } = process.env;

const URLS = [
  // "https://www.gamestop.com/search/?q=rtx+3080&lang=default",
  "https://www.bestbuy.com/site/nvidia-geforce-rtx-3070-ti-8gb-gddr6x-pci-express-4-0-graphics-card-dark-platinum-and-black/6465789.p?acampID=0&cmp=RMX&irclickid=S3C09JQvuxyLUFc0EHQlB1XYUkBwHCWhw0my2U0&irgwc=1&loc=Narrativ&mpid=376373&ref=198&skuId=6465789",
];

const main = () => crawl({ urls: URLS });
poller(main, Number(INTERVAL_MS));
