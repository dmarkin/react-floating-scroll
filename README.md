# react-floating-scroll
Floating Scroll React Component
Inspired by jQuery Floating Scroll plugin (https://amphiluke.github.io/floating-scroll).

Used especially for antd (https://ant.design) wide and long tables

### Usage at the parent component:

```js
import SteakyScroll from 'path/to/SteakyScroll';
import LongContentComponent from 'path/to/LongContentComponent';
...

class YourParentComponent extends Component {

constructor(props) {
    super(props);

    this.contentRef = React.createRef();
    ...
    }

...

render() {
    return (
        <SteakyScroll contentRef={this.contentRef}
                      innerScrollableClass={`${innerScrollableClassName}`}>
            <LongContentComponent {...props}
                ref={this.contentRef}>
        </SteakyScroll>);
    }
}
```

For example, with antd tables:
innerScrollableClassName is 'ant-table-body'
LongContentComponent is Table