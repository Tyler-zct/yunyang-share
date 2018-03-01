$(window).load(function() {
  //  获取key
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    // console.log(window.location);
    if (r != null) return unescape(r[2]);
    return null;
  }
  const key = GetQueryString("key");
  if (key != null && key.toString().length > 1) {
    console.log(GetQueryString("key"));
  }
  $.ajax({
    url: `https://sharegyms.cn/kong-appint/social/sharing/${key}`,
    // url: `https://tst.ipukr.cn/kong-appint/social/sharing/b82941ab-768d-4b1e-a9ee-f702bf10a7c7`,
    type: "get",
    dataType: "json",
    success: function(res) {
      // console.log(res.data);
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
          list.css('background-image',`url(${picture[i]})`);
          $('#pictures').append(list);
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

      $('#full_feature').swipeslider({
        sliderHeight: '7rem'
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
});
