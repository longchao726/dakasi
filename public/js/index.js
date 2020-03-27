$(function () {
  //定义函数获取首页产品的数据
  function send (data) {
    $.ajax({
      type: 'get',
      url: 'http://localhost:3000/products',
      dataType: 'json',
      data: data,
      success (result) {
        var product = ''
        for (list of result) {
          product += `
                <li>
                  <div class="imgDiv">
                    <a href="javascript:;"><img src="${list.image}" alt=""></a>
                  </div>
                  <div class="proTitle">
                    <a href="javasctipt:;">
                      ${list.title}
                      <em></em>
                    </a>
                  </div>
                  <div class="txt">
                    ${list.description}
                  </div>
                </li>
          `
        }
        $('.indexProduct ul').html(product)

        //设置首页商品轮播动图
        //首先窗口显示三个，所以，要复制前三个产品到最后，
        $('.indexProduct ul').children().slice(0, 3).each(function (i, elem) {
          var html = $(elem).html()
          $('.indexProduct ul').append(`<li>${html}</li>`)
        })
        //定义函数进行轮播
        //每次发送请求默认ul的初始状态的left就是0
        $('.indexProduct ul').removeClass('transition')
        $('.indexProduct ul').css('left', 0)
        function moveTo (width) {
          $('.indexProduct ul').addClass('transition')
          //通过传进来的参数来进行滚动，每次滚动相同的距离
          $('.indexProduct ul').css('left', parseInt($('.indexProduct ul').css('left')) - width + 'px')
        }
        //定义初始值设置默认可以点击
        var canClick = true;
        function move (width) {
          //如果可以点击，就执行动画
          if (canClick) {
            //动画一开始就设置为false
            canClick = false;
            moveTo(width);
          }
          //设置定时器，当动画播放完毕可以再次点击
          setTimeout(() => {
            canClick = true;
          }, 1000)
        }
        //首先清除左右点击按钮的点击事件，因为jquery中默认是增加事件队列，不是覆盖上一次的事件
        $('.box .icon-next').unbind("click");
        $('.box .icon-prev').unbind('click');
        //获取ul下li的数量，在这里减去3是因为上面复制了3个产品，所以真实的数量要比获取到的数量少3个
        var count = $('.indexProduct ul').children().length - 3;
        //获取每次需要移动的距离
        var width = $('.listBox ul li').outerWidth(true)
        //设置初始值
        var i = 0;
        $('.box .icon-next').click(() => {
          //如果可以点击的话
          if (canClick) {
            //i自增
            i++;
            //执行动画
            move(width)
            //如果i等于li的真是数量的话
            if (i == count) {
              //让i等于0
              i = 0;
              //设置定时器500毫秒以后执行，因为动画持续时间是500毫秒，要等到上一个动画执行完毕
              setTimeout(() => {
                //去掉ul的transition动画效果
                $('.indexProduct ul').removeClass('transition')
                //ul的left归零
                $('.indexProduct ul').css('left', 0)
              }, 500)
            }
          }
        })
        $('.box .icon-prev').click(() => {
          if (canClick) {
            if (i == 0) {
              $('.indexProduct ul').removeClass('transition')
              $('.indexProduct ul').css('left', -(width * count) + 'px')
              i = count - 1;
              setTimeout(() => {
                move(-width)
              }, 0)
            } else {
              i--;
              move(-width)
            }
          }
        })

        setInterval(() => {
          $('.box .icon-next').click();
        }, 6000)
      }
    })
  }
  //设置首次默认发送请求的产品
  var data = 'family_id=1'
  send(data);
  //首页公司简介视频的切换
  $('.videoImg').on('click', 'img', e => {
    var $this = $(e.target)
    //获取img身上自定义属性的值
    var path = $this.attr('data-target')
    //把获取到的值赋值给视频的路径
    $('.videos video').prop('src', `video/${path}`)
    //如果选中则加上class active，则其父元素的其他兄弟的子元素去掉active
    $this.addClass('active').parent().siblings().children().removeClass('active')
  })

  //首页产品的标签页功能
  //获取父元素，给父元素添加点击事件，只有子元素是li的时候才可以执行后续代码
  $('.tea').on('click', 'li', e => {
    var $this = $(e.target);
    //让自身添加类名liNow，并且把其他所有兄弟元素的类名去掉
    $this.addClass('liNow').siblings().removeClass('liNow');
    //获取li自定义属性的值，作为参数发送ajax请求获取数据
    data = $this.attr('data-target');
    send(data);
  });
  //在中小屏时产品标签页功能的动画
  var liWidth = $('.tea li').outerWidth(true);
  var liCount = 1;
  $('.leftDiv .icon-next').click(() => {
    console.log(liCount)
    if (liCount < 4) {
      liCount++;
      $('.tea').css('left', parseInt($('.tea').css('left')) - liWidth + 'px');
    }
  })
  $('.leftDiv .icon-prev').click(() => {
    console.log(liCount)
    if (liCount > 1) {
      liCount--;
      $('.tea').css('left', parseInt($('.tea').css('left')) + liWidth + 'px');
    }
  })
  //当窗口大小发生改变时，从新获取产品的宽度进行动画
  $(window).resize(function () {
    send(data);
  });

  //首页banner轮播图动画切换效果
  //先获取ul1下所有li，为ul2添加子元素，
  $('.banner .ul1').children().each((i, elem) => {
    $('.banner .ul2').append('<li></li>')
  })
  $('.banner .ul2').on('click', 'li', e => {
    $(e.target).addClass('active').siblings().removeClass('active')
    var index = $(e.target).index()
    $('.banner .ul1 li').eq(index).addClass('active').siblings().removeClass('active')
  })
})