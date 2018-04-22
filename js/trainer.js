$(function() {
  //  获取key
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  const key = GetQueryString("key");

  $.ajax({
    url: `/kong-appint/social/sharing/${key}`,
    // url: `https://tst.ipukr.cn/kong-appint/social/sharing/2c58c374-10a0-4b31-88de-40e61d9fdc39`,
    type: "get",
    dataType: "json",
    success: function(res) {
      let date = res.data;
      $("#gym_title").html(date.gym.title);
      $("#gym_address").html(date.gym.address);
      $("#brief").html(date.brief);
      $(".user").html(date.title);
      //  运动标签
      let lab = date.labels,
        label = "";
      for (let i = 0; i < lab.length; i++) {
        label += `<span>#${lab[i]}</span>`;
      }
      $(".label").append(label);
      //  私教课图片
      let picture = date.pictures,
        pictures_list;
      for (let i = 0; i < picture.length; i++) {
        pictures_list += `
        <li class="sw-slide">
          <img src=${picture[i]} alt="" class="square">
        </li>`;
      }
      $("#pictures").html(pictures_list);
      //  轮播图
      $("#full_feature").swipeslider();

      $(".download").click(function() {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        if (isAndroid == true) {
          window.location.href =
            "http://sj.qq.com/myapp/detail.htm?apkName=com.sharegyms";
        } else if (isIOS == true) {
          window.location.href =
            "https://itunes.apple.com/cn/app/id1340846876?mt=8";
        } else {
          alert("请前往应用商店搜索云扬健身下载!");
        }
      });

      $(".foot").click(function() {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        if (isAndroid == true) {
          window.location.href =
            "http://sj.qq.com/myapp/detail.htm?apkName=com.sharegyms";
        } else if (isIOS == true) {
          window.location.href =
            "https://itunes.apple.com/cn/app/id1340846876?mt=8";
        } else {
          alert("请前往应用商店搜索云扬健身下载!");
        }
      });
    },
    error: function(err) {
      console.log(err);
    }
  });

  // 微信二次分享
  let url = encodeURIComponent(window.location.href.split("#")[0]);

  $.ajax({
    url: `/kong-appint/third/wx/sharing?url=${url}`,
    type: "get",
    dataType: "json",
    success: function(res) {
      wx.config({
        debug: false,
        appId: res.data.appId,
        timestamp: res.data.timestamp, //生成签名的时间戳
        nonceStr: res.data.nonceStr, //生成签名的随机字符串
        signature: res.data.signature, //签名
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ"
        ] //必填，需要使用的JS接口列表
      });

      wx.ready(function() {
        let shareData = {
          title: "健身私教课分享", // 分享后的标题
          desc: "私人教练", // 分享后的描述信息
          link: `https://sharegyms.cn/kong-appint/sharing/trainer.html?key=${key}`, // 点击分享后跳转的页面地址
          imgUrl: encodeURI("https://sharegyms.cn/YY_512px.png") // 分享后展示的图片
        };
        // 分享给朋友
        wx.onMenuShareAppMessage(shareData);
        // 分享到朋友圈
        wx.onMenuShareTimeline(shareData);
        // 分享到QQ
        wx.onMenuShareQQ(shareData);
      });

      // wx.error(function(res){
      //     alert(res.errMsg)
      // })
    },
    error: function(err) {
      console.log(err);
    }
  });
});
