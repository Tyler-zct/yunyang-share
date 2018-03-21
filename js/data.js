$(document).ready(function() {
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
    // url: `https://tst.ipukr.cn/kong-appint/social/sharing/5e453e24-d6b2-4430-9261-449f61c444bd`,
    type: "get",
    dataType: "json",
    success: function(res) {
      let date = res.data;
      let arr = [
        {
          value: date.fat
        },
        {
          value: date.protein
        },
        {
          value: date.bone
        },
        {
          value: date.water
        }
      ];

      //  综合数据图表
      var myChart = echarts.init(document.getElementById("human"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: ["#ffae03", "#fe938c", "#4392f1", "#4bc6b9"],
        series: [
          {
            name: "人体成分",
            type: "pie",
            radius: "80%",
            center: ["50%", "50%"],
            data: arr,
            labelLine: {
              normal: {
                lineStyle: {
                  color: "white"
                }
              }
            }
          }
        ]
      });

      /* 数据头 */
      $("#bodyAge").html(date.bodyAge);
      $("#score").html(date.score);

      let bmi = date.bmi;
      let percent = bmi / 45;
      let value = percent * 9.2;
      value = value - 0.7867 / 2;
      value += "rem";
      $(".value").css("left", value);
      percent = Number(percent * 100).toFixed(1);
      percent += "%";
      $(".prog").attr("x2", percent);

      /* 基本数据 */
      if (date.sex == 1) {
        date.sex = "男";
      }
      if (date.sex == 0) {
        date.sex = "女";
      }
      $("#sex").html(date.sex);
      $("#height").html(date.height);
      $(".weight").html(date.weight);
      $("#age").html(date.age);
      $("#testDate").html(date.testDate);

      /* 健康评级 */
      //  let bodyTypes = ['隐性肥胖型', '肌肉不足型', '消瘦型', '脂肪过多型', '健康匀称型', '低脂肪型', '肥胖型', '超重肌肉型', '运动员型'];
      //  bodyType = date.bodyType - 1;
      $("#bodyType").html(date.bodyType);
      let score = date.score;
      if (score >= 0 && score <= 60) {
        for (var i = 0; i < $(".rate_size").length; i++) {
          $(".rate_size")
            .eq(i)
            .removeClass("rate_active");
        }
        $(".rate_size")
          .eq(4)
          .addClass("rate_active");
      } else if (score > 60 && score <= 75) {
        for (var i = 0; i < $(".rate_size").length; i++) {
          $(".rate_size")
            .eq(i)
            .removeClass("rate_active");
        }
        $(".rate_size")
          .eq(3)
          .addClass("rate_active");
      } else if (score > 75 && score <= 85) {
        for (var i = 0; i < $(".rate_size").length; i++) {
          $(".rate_size")
            .eq(i)
            .removeClass("rate_active");
        }
        $(".rate_size")
          .eq(2)
          .addClass("rate_active");
      } else if (score > 85 && score <= 95) {
        for (var i = 0; i < $(".rate_size").length; i++) {
          $(".rate_size")
            .eq(i)
            .removeClass("rate_active");
        }
        $(".rate_size")
          .eq(1)
          .addClass("rate_active");
      } else if (score > 95 && score <= 100) {
        for (var i = 0; i < $(".rate_size").length; i++) {
          $(".rate_size")
            .eq(i)
            .removeClass("rate_active");
        }
        $(".rate_size")
          .eq(0)
          .addClass("rate_active");
      } else {
        console.log("error: 您的评分超越了界限！");
      }

      /* 综合数据：人体成分01 */
      $(".weightNormalRange").html(date.weightNormalRange);
      $(".water").html(date.water);
      $("#waterWeightRadio").html(date.waterWeightRadio);
      $(".waterNormalRange").html(date.waterNormalRange);
      $(".protein").html(date.protein);
      $("#proteinWeightRadio").html(date.proteinWeightRadio);
      $(".proteinNormalRange").html(date.proteinNormalRange);
      $(".bone").html(date.bone);
      $("#boneWeightRadio").html(date.boneWeightRadio);
      $(".boneNormalRange").html(date.boneNormalRange);
      $(".fat").html(date.fat);
      $(".pbf").html(date.pbf.substr(0, 4));
      $(".fatNormalRange").html(date.fatNormalRange);

      /* 综合数据：人体成分02 */
      $(".lbm").html(date.lbm);
      $(".muscle").html(date.muscle);
      $(".muscleNormalRange").html(date.muscleNormalRange);

      /* 成分分析 */
      $("#trFat").html(date.trFat);
      $("#laFat").html(date.laFat);
      $("#raFat").html(date.raFat);
      $("#llFat").html(date.llFat);
      $("#rlFat").html(date.rlFat);
      $("#trWater").html(date.trWater);
      $("#laWater").html(date.laWater);
      $("#raWater").html(date.raWater);
      $("#llWater").html(date.llWater);
      $("#rlWater").html(date.rlWater);
      $("#trMuscle").html(date.trMuscle);
      $("#laMuscle").html(date.laMuscle);
      $("#raMuscle").html(date.raMuscle);
      $("#llMuscle").html(date.llMuscle);
      $("#rlMuscle").html(date.rlMuscle);

      /* 内脏脂肪指数 */
      $("#vfi").html(date.vfi);
      $("#vfiStatus").html(date.vfiStatus);

      /* 脂肪肝风险系数 */
      $("#liverrisk").html(date.liverrisk);
      $("#liverriskStatus").html(date.liverriskStatus);

      /* 骨骼肌 */
      $("#smm").html(date.smm);
      $("#smmStatus").html(date.smmStatus);
      date.smmTopLimit = date.smmTopLimit.toFixed(1);
      date.smmLowerLimit = date.smmLowerLimit.toFixed(1);
      $(".smmTopLimit").html(date.smmTopLimit);
      $(".smmLowerLimit").html(date.smmLowerLimit);

      /* 水肿系数 */
      $("#edema").html(date.edema);
      $("#edemaStatus").html(date.edemaStatus);

      /* 身材分析 */
      $("#normalWeight").html(date.normalWeight);
      $("#weightControl").html(date.weightControl);
      $("#fatControl").html(date.fatControl);
      $("#muscleControl").html(date.muscleControl);

      /* 体质指数BMI */
      $("#bmi").html(date.bmi);
      $(".value").html(date.bmi);
      $("#bmiStatus").html(date.bmiStatus);

      /* 体脂率 */
      $("#pbfStatus").html(date.pbfStatus);
      $("#pbfDescription").html(date.pbfDescription);

      /* 腰臀比 */
      $("#whr").html(date.whr);
      $(".whrType").html(date.whrType);
      $("div.rate_detail").each(function(i) {
        $(this).removeClass("whr_active");
        if ($(this).text() == date.whrType) {
          $(this).addClass("whr_active");
          let initsrc = $(".whr_active")
            .prev()
            .attr("src");
          initsrc = initsrc.substring(
            initsrc.lastIndexOf("/img") + 1,
            initsrc.length - 5
          );
          $(".whr_active")
            .prev()
            .attr("src", `${initsrc}2.svg`);
        }
      });
      $("#whrNormalRange").html(date.whrNormalRange);

      /* 营养分析 */
      if (date.proteinStatus == "不足") {
        $("#proteinStatus").attr("class", "condition");
        $("#proteinStatus").addClass("insufficient");
      } else if (date.proteinStatus == "正常") {
        $("#proteinStatus").attr("class", "condition");
        $("#proteinStatus").addClass("nutrition");
      } else if (date.proteinStatus == "过量") {
        $("#proteinStatus").attr("class", "condition");
        $("#proteinStatus").addClass("excess");
      }
      if (date.boneStatus == "不足") {
        $("#boneStatus").attr("class", "condition");
        $("#boneStatus").addClass("insufficient");
      } else if (date.boneStatus == "正常") {
        $("#boneStatus").attr("class", "condition");
        $("#boneStatus").addClass("nutrition");
      } else if (date.boneStatus == "过量") {
        $("#boneStatus").attr("class", "condition");
        $("#boneStatus").addClass("excess");
      }
      if (date.fatStatus == "不足") {
        $("#fatStatus").attr("class", "condition");
        $("#fatStatus").addClass("insufficient");
      } else if (date.fatStatus == "正常") {
        $("#fatStatus").attr("class", "condition");
        $("#fatStatus").addClass("nutrition");
      } else if (date.fatStatus == "过量") {
        $("#fatStatus").attr("class", "condition");
        $("#fatStatus").addClass("excess");
      }
      $("#proteinStatus").html(date.proteinStatus);
      $("#boneStatus").html(date.boneStatus);
      $("#fatStatus").html(date.fatStatus);
      $("#bmr").html(date.bmr);

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
              title: "体侧结果分享", // 分享后的标题
              desc: "体测报告", // 分享后的描述信息
              link: `https://sharegyms.cn/kong-appint/sharing/data.html?key=${key}`, // 点击分享后跳转的页面地址
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
    },
    error: function(err) {
      console.log(err);
    }
  });
});
