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
  