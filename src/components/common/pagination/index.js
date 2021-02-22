class Options {
  constructor(arg) {
    arg = arg === undefined ? {} : arg;
    this.small = arg.small === undefined ? false : arg.small;
    // 可选分页数
    this.pageSizes = arg.pageSizes === undefined ? [10, 20, 50, 100] : arg.pageSizes;

    // 选择器个数
    this.pagerCount = arg.pagerCount === undefined ? 7 : arg.pagerCount;

    // 组件"total,sizes,prev,pager,next,->,jumper",
    this.layout = arg.layout === undefined ? "preve,pager,next" : arg.layout;

    // 是否添加背景颜色
    backGround: true,
      this.backGround = arg.backGround === undefined ? false : arg.backGround;

    // 代替图标显示上一页或下一页''空则启用图标
    this.prevText = arg.prevText === undefined ? '' : arg.prevText;
    this.nextText = arg.nextText === undefined ? '' : arg.nextText;
    //绑定事件
    this.handleNextClick = arg.handleNextClick === undefined ? null : arg.handleNextClick;
    this.handlePrevClick = arg.handlePrevClick === undefined ? null : arg.handlePrevClick;
    this.handleCurrentChange = arg.handleCurrentChange === undefined ? null : arg.handleCurrentChange;
    this.handleSizeChange = arg.handleSizeChange === undefined ? null : arg.handleSizeChange;

  }
}
export {
  Options
}