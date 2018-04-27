# react-floating-scroll
Floating Scroll React Component
Inspired by jQuery Floating Scroll plugin (https://amphiluke.github.io/floating-scroll/)

Used espesially for antd (https://ant.design/) wide and long tables

Usage at the parent component:

```js
import SteakyScroll from 'components/general/SteakyScroll';
...

class YourParentComponent extends Component {

constructor(props) {
    super(props);

    this.contentRef = React.createRef();
    ...
    }

render() {
return (
<SteakyScroll tableRef={this.tableRef} innerScrollableClass={'ant-table-body'}>
<Table {...props}
ref={this.contentRef}>
</SteakyScroll>);
}
}
```