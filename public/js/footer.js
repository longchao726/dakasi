$(function () {
  $.ajax({
    type: 'get',
    url: 'footer.html',
    success (result) {
      $(result).replaceAll('footer')
    }
  })
})