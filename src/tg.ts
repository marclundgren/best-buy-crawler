import TG from "telegram-bot-api";
import * as dotenv from "dotenv";

dotenv.config();

const api = new TG({
  token: process.env.TELEGRAM_TOKEN,
});

// @ts-ignore
const me = () => api.getMe().then(console.log).catch(console.error);

const tg = () => {
  return {
    me: me(),
    api,
  };
};

try {
  me();
} catch (err) {
  console.error(err);
  console.log(Object.keys(api));
}

// module.exports = api;

export default api;
