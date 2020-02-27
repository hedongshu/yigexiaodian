// 云函数入口文件
const cloud = require("wx-server-sdk");
const request = require("request");
const cheerio = require("cheerio");

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  const text = event.text; //穿过来的搜索关键词
  request.get("https://parse.xymov.net/api.php", {
    wd: text
  });

  return {
    res: event
  };
};
