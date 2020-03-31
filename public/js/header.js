$(function () {
  $.ajax({
    type: 'get',
    url: 'header.html',
    success (result) {
      $(result).replaceAll('header')
      //设置在中小屏下导航的显示和隐藏
      $('#navIco').click(() => $('#navLayer').css('right', '0'))
      $('#closeBtn').click(() => $('#navLayer').css('right', '-100%'))
      //设置在中小屏下搜索框的显示和隐藏
      $('#topSearchIco').click(() => {
        $('#searchLayer').css('display', 'block').css('opacity', '1')
        $('#pageBg').css('display', 'block')
      })
      $('#pageBg').click(() => {
        $('#searchLayer').css('display', 'none')
        $('#pageBg').css('display', 'none')
      })
      //中小屏下导航手风琴效果
      $('#sideNav').on('click', 'li:not(:first-child)', e => {
        $(e.target).toggleClass('active').siblings().removeClass('active')
      })

      $('.search img').click(() => {
        console.log(111)
        location.href = 'search.html?q=' + $('.search input').val();
      })
    }
  })
})
