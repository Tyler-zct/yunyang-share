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
    url: `https://sharegyms.cn/kong-appint/social/sharing/${key}`,
    // url: `https://tst.ipukr.cn/kong-appint/social/sharing/b82941ab-768d-4b1e-a9ee-f702bf10a7c7`,
    type: "get",
    dataType: "json",
    success: function(res) {
      let date = res.data;
      // 评论数
      if (date.commentCount == 0) {
        $("#comment").html(`<div class="zan">评论</div>
          <div class="comment_default">还没有人评论过，快来抢沙发</div>`);
      } else {
        // 评论情况
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
      }
      $("#commentCount").html(date.commentCount);
      // 地址
      if (date.address == null) {
        $("#adicon").remove();
      } else {
        $("#address").html(date.address);
      }
      //   内容
      $("#content").html(date.content);
      //   更新时间
      $("#lastTime").html(date.crtTime);
      //  发布时经度
      $("#lat").html(date.lat);
      //   点赞数, 默认0
      $("#likeCount").html(date.likeCount);
      //  发布时纬度
      $("#lnt").html(date.lnt);
      //   发布者昵称
      $("#ownerNickname").html(date.ownerNickname);
      //   发布者头像
      $("#ownerPortrait").attr("src", date.ownerPortrait);
      //   图片
      var picture = date.pictures;
      var pictures_list;
      if (picture.length == 0) {
        $("#full_feature").remove();
      } else if (picture.length == 1) {
        $("#pictures").remove();
      } else {
        for (let i = 0; i < picture.length; i++) {
          let list = $("<li class='sw-slide backimg'></li>");
          list.css("background-image", `url(${picture[i]})`);
          $("#pictures").append(list);
        }
      }

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

      $("#full_feature").swipeslider({
        sliderHeight: "7rem"
      });

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
          title: "动态分享", // 分享后的标题
          desc: "点击查看动态详情", // 分享后的描述信息
          link: `https://sharegyms.cn/kong-appint/sharing/dynamic.html?key=${key}`, // 点击分享后跳转的页面地址
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
