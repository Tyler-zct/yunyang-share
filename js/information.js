$(window).load(function() {
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
    // url: `https://sharegyms.cn/kong-appint/social/sharing/9ac32175-bbe3-4fed-8768-4ac9a3ab3abb`,
    type: "get",
    dataType: "json",
    success: function(res) {
      let date = res.data;
      //  评论数, 默认0
      $("#commentCount").html(date.commentCount);
      //   资讯内容
      $("#content").html(date.content);
      //  阅读数
      $("#counter").html(date.readCount);
      //   创建时间
      $("#crtTime").html(date.crtTime);
      //  点赞数, 默认0
      $("#likeCount").html(date.likeCount);
      //   标题
      $("#title").html(date.title);

      // 评论详情
      let comments = date.comments;
      $.each(comments, (i, ele) => {
        let str = `<div class="comment_content">
                    <img src="${ele.ownerPortrait}" alt="" class="portrait">
                    <div>
                        <div class="comment_user">${ele.ownerNickname}</div>
                        <div class="time">${ele.crtTime}</div>
                        <div class="default">${ele.content}</div>
                    </div>
                </div>`;
        $("#comments").append(str);
      });

      // 点赞头像
      let like = date.likes;
      let like_list = "";
      for (let i = 0; i < like.length; i++) {
        like_list += `<li>
                        <img src="${
                          like[i].ownerPortrait
                        }" alt="" class="portrait">
                     </li>`;
      }
      $("#likes").html(like_list);
      let more = `<li>
                <img src="./img/course_titlebar_more.svg" alt="" class="more portrait">
            </li>`;
      $("#likes").append(more);

      // 轮播图
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
          title: "健身资讯分享", // 分享后的标题
          desc: "云扬共享大数据健身房,为您的健康保驾护航", // 分享后的描述信息
          link: `https://sharegyms.cn/kong-appint/sharing/information.html?key=${key}`, // 点击分享后跳转的页面地址
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
