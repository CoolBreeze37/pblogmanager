class Column {
  constructor(options) {
    this.options = options === undefined ? {} : options;
    // 是否为search表头    
    this.widthSearchInput = this.options.widthSearchInput === undefined ? false : this.options.widthSearchInput;
    //表示是否是自定义列
    this.custom = this.options.custom === undefined ? false : this.options.custom;
    //如果是自定义列则设置自定义列类型 button/tag
    this.customType = this.options.customType === undefined ? "" : this.options.customType;
    //如果是自定义列设置customElements Array(CustomElement)
    this.customElements = this.options.customElements === undefined ? [] : this.options.customElements;
    // 列宽
    this.width = this.options.width === undefined ? "" : this.options.width;
    //设置列名
    this.label = this.options.label === undefined ? "label" : this.options.label;
    //设置列prop
    this.prop = this.options.prop === undefined ? "" : this.options.prop;
    //设置固定方向及是否fixed固定 left/right/（不进行固定）fixed
    this.fixed = this.options.fixed === undefined ? false : this.options.fixed;;
    //设置filters （Array类型）
    this.filters = this.options.filters === undefined ? undefined : this.options.filters;
    //设置filter-method
    this.filterHandler = this.options.filterHandler === undefined ? undefined : this.options.filterHandler;
    //设置filter-placement
    this.filterPlacement = this.options.filterPlacement === undefined ? "" : this.options.filterPlacement;
    //设置是否可以通过此列排序
    this.sortable = this.options.sortable === undefined ? false : this.options.sortable;
  }
}
// 为自定义列创建自定义button
class CustomButton {
  constructor(options) {
    this.options = options === undefined ? {} : options;
    //设置button的type primary/success...
    this.type = this.options.type === undefined ? "text" : this.options.type;
    //设置button的size large/mini...
    this.size = this.options.size === undefined ? "mini" : this.options.size;
    //设置按钮文字
    this.label = this.options.label === undefined ? "按钮" : this.options.label;;
    //设置按钮事件参数
    this.clickHandler = this.options.clickHandler === undefined ? null : this.options.clickHandler;
  }
}
class CustomPopover {
  constructor(options) {
    this.options = options === undefined ? {} : options;
    //设置按钮文字
    // popoverItems是一个Array {label:标签,prop:属性值}
    this.popoverItems = this.options.popoverItems === undefined ? [] : this.options.popoverItems;
    // 类型是一个CustomTag标签
    this.tag = this.options.tag === undefined ? null : this.options.tag;
  }
}
// 为自定义列创建tag
class CustomTag {
  constructor(options) {
    this.options = options === undefined ? {} : options;
    //设置tag的type style接收一个字典 Key:'样式'
    this.style = this.options.style === undefined ? {} : this.options.style;
    this.mapper = this.options.mapper === undefined ? {} : this.options.mapper;
  }
}
export {
  Column,
  CustomButton,
  CustomPopover,
  CustomTag
}