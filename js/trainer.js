$(function() {
  //  获取key
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    //  console.log(window.location)
    if (r != null) return unescape(r[2]);
    return null;
  }
  const key = GetQueryString("key");
  if (key != null && key.toString().length > 1) {
    console.log(GetQueryString("key"));
  }
  $.ajax({
    url: `https://sharegyms.cn/kong-appint/social/sharing/${key}`,
    // url: `https://tst.ipukr.cn/kong-appint/social/sharing/346de274-ec9d-4646-bb94-55abffc99da6`,
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
});
