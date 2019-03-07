## HTMLElement.tabIndex
  ### 设置或获取当前元素的tab键激活顺序

  ### 支行tabIndex的元素
    1) a
    2) button
    3) select
    4) area
    5) textarea
    6) input
    7) object

  ### 语法
    <a href="javascript:;" tabIndex="3">
    <select name="" tabIndex="10"></select>
    <button tabIndex="1"></button>

    or

    element.tabIndex = index;

  ### 参数  index

    tab键的执行顺序
      1) tabIndex > 0 时, 如果多个tabIndex相同， 谁先出现在页面中，切换tab时谁先获得焦点，另切换 tab 是按 tabIndex 值由小到大来遍历

      2）tabIndex === 0的元素，当所有 tabIndex > 0的元素遍历后，才到自己身上

      3) tabIndex < 0的元素，切换 tab 是不会被遍历到

      另: tabIndex值不需要连续，同时也不需要从指定的值开始， 只要值 >= 0 就会被遍历到。
