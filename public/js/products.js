$(function () {

  //获取地址栏中查询字符串信息
  var data = location.search.substring(1);
  var params = {}
  data.split('&').forEach(elem => {
    var [a, b] = elem.split('=');
    params[a] = b;
  })
  var { family_id, _page } = params;
  //查找商品分类元素集合进行遍历
  $('.productNav li a').each(function () {
    var el = $(this);
    //如果商品分类的链接地址查询字符串和当前url地址栏中查询字符串一样，则为其添加class，否则去掉class
    el.attr('href').split('?')[1].split('&')[0].split('=')[1] == family_id ? el.addClass('aNow') : el.removeClass('aNow')

  })
  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/products',
    data: data,
    dataType: 'json',
    success (result) {
      console.log(result)
      var html = '';
      for (product of result) {
        html += `
        <li>
          <div class="box">
            <div class="imgDiv">
              <a href="javascript:;">
                <img src="${product.image}" alt="">
              </a>
            </div>
            <div class="name">
              <a href="javascript:;">
                ${product.title}
                <em></em>
              </a>
            </div>
            <div class="txt">
              ${product.description}
            </div>
          </div>
        </li>
        `
      }
      if (_page) {
        $('.pageNum').html(
          `
          <a href="product.html?family_id=${family_id}&_page=1&_limit=6" class="prev">
              <span>上一页</span>
            </a>
            <a href="product.html?family_id=${family_id}&_page=1&_limit=6" class="aNow">1</a>
            <a href="product.html?family_id=${family_id}&_page=2&_limit=6">2</a>
            <a href="product.html?family_id=${family_id}&_page=2&_limit=6" class="next">
              <span>下一页</span>
            </a>
          `
        )
        $('.pageNum a').slice(1, 3).each(function () {
          var el = $(this);
          //如果商品分类的链接地址查询字符串和当前url地址栏中查询字符串一样，则为其添加class，否则去掉class
          el.attr('href').split('?')[1].split('&')[1].split('=')[1] == _page ? el.addClass('aNow') : el.removeClass('aNow')
        })
      }
      $('.rightDiv .list ul').html(html)
    }
  })
})