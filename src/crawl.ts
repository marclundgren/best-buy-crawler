import Crawler, { CrawlerRequestOptions } from "crawler";
import * as dotenv from "dotenv";
import tg from "./tg";

dotenv.config();

const { TELEGRAM_CHAT_ID } = process.env;

const delay = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

type Props = {
  urls: string[];
};

const crawl = (props: Props) => {
  const crawlConfig = {
    rotateUA: true,
    // userAgent:
    //   "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
    maxConnections: 10,
    // This will be called for each crawled page
    callback: async (error, res, done) => {
      if (error) {
        console.log(error);
      } else {
        console.log("uri", res.options.uri);
        var $ = res.$;
        console.log($("title").text());
        await delay(10000);

$(".add-to-cart-button") // <- 
  .toArray()
  .map((item) => {
    const buttonTextContent = $(item).text().trim().toLowerCase();

    if (buttonTextContent) {
      console.log({ buttonTextContent });

      if (buttonTextContent !== "coming soon") {
        // its ready!
tg.sendMessage({
  chat_id: TELEGRAM_CHAT_ID,
  text: `A device might be ready for purchase! ${res.options.uri}`,
})
  .then(console.log)
  .catch(console.error);
      } else {
        console.log("Coming Soon...");
      }
    }
  });
      }
      done();
    },
  } as CrawlerRequestOptions;

  console.log("crawConfig", crawlConfig);

  const c = new Crawler(crawlConfig);

  const { urls = [] } = props;

  urls.forEach((url) => {
    console.log("crawing this url", url);
    c.queue(url);
  });
};

export default crawl;
