const $sitelist = $(".siteList");
const $lastLi = $sitelist.find("li.last");

const frist = localStorage.getItem("X");
const fristObjet = JSON.parse(frist);
const hashMap = fristObjet || [
  { logo: "A", url: "https://www.acfun.cn" },
  { logo: "B", url: "https://www.baidu.com" },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};
const render = () => {
  $sitelist.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`
        <li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class = "close">
                  <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-delete"></use>
                  </svg>
                </div>
            </div>   
        </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      console.log(node.url);
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();

$(".addButton").on("click", () => {
  let url = window.prompt(" 你想添加的网址是？");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });
  render();
});
//回退保存数据到本地 并
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("X", string);
};
$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowercase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
