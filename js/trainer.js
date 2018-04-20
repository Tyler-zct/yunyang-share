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
    // url: `https://sharegyms.cn/kong-appint/social/sharing/346de274-ec9d-4646-bb94-55abffc99da6`,
    type: "get",
    dataType: "json",
    success: function(res) {
      let date = res.data;

      $("#name").html(date.name);
      $(".gender").html(date.gender);
      $("#stature").html(date.stature);
      $("#weight").html(date.weight);
      $("#gym").html(date.title);
      $("#address").html(date.address);
      $("#brief").html(date.brief);
      //  运动标签
      let lab = date.major,
        label = "";
      for (let i = 0; i < lab.length; i++) {
        label += `<span>#${lab[i]}</span>`;
      }
      $(".label").append(label);
      //  私教图片
      let picture = date.pictures,
        pictures_list;
      for (let i = 0; i < picture.length; i++) {
        pictures_list += `<li class="sw-slide">
                        <img src=${picture[i]} alt="" class="square">
                     </li>`;
      }
      $("#pictures").html(pictures_list);
      //  轮播图
      $("#full_feature").swipeslider();
      // 评论情况
      let comments = date.comments;
      $("#comment_num").html(comments.length);
      if (comments.length == 0) {
        $("#comments").html(`还没有人评论过`);
        $("#comments").addClass("comment_default");
      } else {
        $.each(comments, (i, ele) => {
          let str = `<div class="comment_content">
                       <div>
                           <img src="${
                             ele.ownerPortrait
                           }" alt="" class="remark_portrait">
                       </div>
                       <div style="width:90%;">
                           <div class="comment_user">${ele.ownerNickname}</div>
                           <div class="time">${ele.crtTime}</div>
                           <div class="">
                               <span id="user${i +
                                 1}" class="target-star"></span>
                           </div>
                           <div class="default">${ele.content}</div>
                       </div>
                   </div>`;
          $("#comments").append(str);
        });
      }

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
          title: "健身私教分享", // 分享后的标题
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
