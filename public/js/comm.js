(function () {
  //获取需要操作的元素对象，
  //通过id获取整个ul
  var sideNav = document.getElementById('sideNav');
  //利用时间委托给整个父元素ul添加点击事件，
  sideNav.onclick = function (e) {
    //如果点击的对象的第一个直接子元素的节点名是span则，可以执行下面函数
    if (e.target.firstChild.nodeName == 'SPAN') {
      //这时e.target就是ul下的每个li，并且不包含第一个li
      if (e.target.className == 'active') {
        //如果这个li的class的值为active，则清空class
        e.target.className = '';
      } else {
        //因为只能有一个开着，所以，如果要等于active的话先检查一下，看是否还有其他li的className是active
        var liActive = sideNav.querySelector('li.active');
        //如果能找到这个li并且className是active，加判断，如果不是null则让他的className变成空
        if (liActive != null) {
          liActive.className = ''
        }
        //让现在点击li的className等于active
        e.target.className = 'active';
      }
    }
  }
})();
//操作小屏下二级导航和页头图标的显示


