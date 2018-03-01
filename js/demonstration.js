$(function() {
  //  获取key
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    console.log(window.location);
    if (r != null) return unescape(r[2]);
    return null;
  }
  const key = GetQueryString("key");
  if (key != null && key.toString().length > 1) {
    console.log(GetQueryString("key"));
  }

  $.ajax({
    url: `https://sharegyms.cn/kong-appint/social/sharing/${key}`,
    // url: `https://tst.ipukr.cn/kong-appint/social/sharing/6196726a-d35b-4e2f-b998-ea06df0d50e6`,
    type: "get",
    dataType: "json",
    success: function(res) {
      let date = res.data;
      /* 课程信息 */
      $("#title").html(date.title);
      $("#describe").html(date.describe);
      $(".square").attr("src", date.cover);
      // 健身标签
      let lab = date.label,
        label = "";
      for (let i = 0; i < lab.length; i++) {
        label += `<span>#${lab[i]}</span>`;
      }
      $(".label").append(label);
      // 课程简介
      $("#brief").html(date.brief);
      //  报名截止时间
      let firstDate = new Date(date.deadline);
      let secondDate = new Date(firstDate.valueOf() - 12 * 60 * 60 * 1000);
      secondDate = secondDate.toLocaleString();
      $("#deadline").html(date.deadline);
      $("#abolish").html(secondDate);
      //  报名人数
      $("#enrolls").html(date.enrolls);
      //  健身房信息
      $("#gym_title").html(date.gym.title);
      $("#gym_address").html(date.gym.address);
      //  教练名单
      let instructors = date.instructors;
      $.each(instructors, (i, ele) => {
        let str = `<div class="coach">
                    <img src="${
                      ele.cover
                    }" alt="" class="remark_portrait" style="margin-top:0.25rem;"> 
                    <div class="default">
                        <span>${ele.name}</span><span class="gary">(${
          ele.title
        })</span>
                    </div>
                    <div class="gary">评分${ele.score}</div>
                </div>`;
        $("#instructors").append(str);
      });

      $("#ins_count").html(date.instructors.length);

      //  课程价格
      $("#price").html(date.price);
      //  课程人数, 最小限制
      $("#traineeMinmum").html(date.traineeMinmum);

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
