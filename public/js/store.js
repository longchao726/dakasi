$(function () {
  //获取url地址栏中的查询字符串
  var data = location.search.substring(1);
  //如果没有查询字符串，默认查询分页的第一页
  if (data == '') {
    data += '_page=1&_limit=9'
  }
  //参数结构，把查询字符串每个参数都提取出来
  var params = {}
  data.split('&').forEach(elem => {
    var [a, b] = elem.split('=');
    params[a] = b;
  })
  var { _page } = params;
  //发送ajax请求，获取参数
  send(data);
  function send (data) {
    $.ajax({
      type: 'get',
      url: 'http://localhost:3000/stores',
      data: data,
      dataType: 'json',
      success (result) {
        var html = '';
        for (var store of result) {
          html += `
            <li>
              <div class="box">
                <div class="imgDiv">
                  <img src="${store.img}" alt="">
                </div>
                <div class="botDiv">
                  <div class="name">${store.name}</div>
                  <div class="msg"></div>
                </div>
              </div>
            </li>
        `
        }
        $('.list ul.clearFix').html(html)
        if (_page) {
          $('.pageNum').html(`
              <a href="store.html?_page=1&_limit=9" class="prev">
                <span>上一页</span>
              </a>
              <a href="store.html?_page=1&_limit=9" class="aNow">1</a>
              <a href="store.html?_page=2&_limit=9">2</a>
              <a href="store.html?_page=2&_limit=9" class="next">
                <span>下一页</span>
              </a>
        `)
          $('.pageNum a').slice(1, 3).each(function () {
            var el = $(this);
            el.attr('href').split('?')[1].split('&')[0].split('=')[1] == _page ? el.addClass('aNow') : el.removeClass('aNow')
          })
          $('.pageMore span').html('加载更多')
          $('.pageMore span').click(() => {
            $('.pageMore span').html('加载中...')
            _page = parseInt(_page) + 1
            data = `_page=${_page}&_limit=9`
            $.ajax({
              type: 'get',
              dataType: 'json',
              url: 'http://localhost:3000/stores',
              data: data,
              success (result) {
                if (result.length < 9) {
                  $('.pageMore span').html('没有更多数据了')
                }
                for (var store of result) {
                  html += `
                    <li>
                      <div class="box">
                        <div class="imgDiv">
                          <img src="${store.img}" alt="">
                        </div>
                        <div class="botDiv">
                          <div class="name">${store.name}</div>
                          <div class="msg"></div>
                        </div>
                      </div>
                    </li>
                `
                }
                $('.list ul.clearFix').html(html)
              }
            })
          })

        }
      }
    })
  }

  var citys = ['广州', '上海', '北京']
  var regions = [
    [
      { 'name': '广州市', 'value': 0 }
    ],
    [
      { 'name': '深圳市', 'value': 1 },
      { 'name': '上海市', 'value': 1 },
      { 'name': '武汉市', 'value': 1 }
    ],
    [
      { 'name': '北京市', 'value': 2 }
    ]
  ];
  //循环把城市的名字添加到select选项中
  for (var i = 0; i < citys.length; i++) {
    $('#city').append(`<option value="${i}">${citys[i]}</option>`)
  }
  //当城市的select选项改变时
  $('#city').change(function () {
    var $this = $(this);
    //获取选中的城市的下标减去1，因为城市里面比地区多一个选项
    var region = regions[$this.prop('selectedIndex') - 1]
    //遍历地区对应下标的数组
    if ($this.prop('selectedIndex') - 1 >= 0) {
      //把地区的每个选项添加到地区的option里，在添加之前先清空上次选中的响
      $('#region').html('<option value="">请选择地区</option>')
      for (var i = 0; i < region.length; i++) {
        $('#region').append(`<option value="${region[i].value}">${region[i].name}</option>`)
      }
    } else if ($this.prop('selectedIndex') == 0) {
      $('#region').html('<option value="">请选择地区</option>')
    }
  })
  //当地区的选中项发生改变时，发送ajax请求
  $('#region').change(function () {
    var $this = $(this);
    //先获取到选中项的dom元素
    var value = $this.children()[$this.prop('selectedIndex')]
    //如果这个元素的html内容不是请选择地区
    if ($(value).html() != '请选择地区') {
      //把参数赋值给data
      data = location.search = 'region=' + $(value).html()
      //发送ajax请求
      send(data);
    }
  })
  //设置默认选中项，获取地址栏中的参数
  var reg = decodeURI(data).split('=')[1]
  //循环遍历地区数组
  for (var i = 0; i < regions.length; i++) {
    //因为地区是二维数组，所以进行第二次循环
    for (var region of regions[i]) {
      //如果地址栏中的参数和数组中的name相同的话
      if (region.name == reg) {
        //通过这个对象的name名获取value的值，然后加1(因为城市选项里面有请选择城市选项占位)让这个下标为选中
        var city = $('#city').children()[region.value + 1];
        $(city).prop('selected', true)
        $('#region').append(`<option value="${region.value}" selected>${region.name}</option>`)
      }
    }
  }
  //点击搜索框按钮搜索地区
  $('.box1 button').click(function () {
    if ($('.box1 input').val() != '') {
      data = location.search = 'q=' + $('.box1 input').val()
    }
  })
  $(window).keyup(e => {
    if (e.keyCode == 13 && $('.box1 input').val() != '') {
      data = location.search = 'q=' + $('.box1 input').val()
    }
  })
})