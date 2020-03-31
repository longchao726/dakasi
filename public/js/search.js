$(function () {
  var data = location.search.substring(1);
  $('.indexTitle').html(`搜索结果，跟进你的关键字("${decodeURI(data.split('=')[1])}")`)
  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/products',
    data: data,
    success (result) {
      console.log(result);
      $('.tab2 .liNow').html(`产品中心(${result.length})`)
      var html = ''
      for (list of result) {
        html += `
              <a href="javascript">
                <li>
                  <div class="title">${list.title}a</div>
                </li>
                <li>
                  <div class="title">${list.time}</div>
                </li>
              </a>
              `
      }
      $('.tabContentDiv2 ul').html(html)
    }
  })
})