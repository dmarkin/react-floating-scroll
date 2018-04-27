import React, {Fragment, Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './ReactFloatingScroll.css';

class ReactFloatingScroll extends Component {
  static propTypes = {
    contentRef: PropTypes.object.isRequired,
    innerScrollableClass: PropTypes.string
  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.scrollRef = React.createRef();
    this.scrollBlockRef = React.createRef();

    this.state = {
      contentRefEl: ReactDOM.findDOMNode(props.contentRef.current),
      scrollRefEl: this.scrollRef.current,
      visible: true,
      preventSyncCont: false,
      preventSyncSbar: false
    };
  }

  componentDidMount() {
    const contentRefEl = ReactDOM.findDOMNode(this.props.contentRef.current);
    const elToScroll = contentRefEl.getElementsByClassName(this.props.innerScrollableClass)[0];
    const scrollWidth = contentRefEl && elToScroll ? elToScroll.scrollWidth : 0;
    const scrollRefEl = this.scrollRef.current;
    const scrollBlockRefEl = this.scrollBlockRef.current;

    const _this = this;

    if (contentRefEl && elToScroll) {
      elToScroll.onscroll = (e) => {
        _this.syncSbar(e.target, true);
      };
      elToScroll.onfocus = () => {
        setTimeout(_this.syncSbar.bind(_this, contentRefEl), 0);
      };
    }

    if (scrollRefEl) {
      scrollRefEl.onscroll = (e) => {
        _this.state.visible && _this.syncCont(e.target, true);
      };
    }

    window.onscroll = this.checkVisibility;
    window.onresize = this.checkVisibility;

    const contRect = contentRefEl.getBoundingClientRect();
    const maxVisibleY = window.innerHeight || document.documentElement.clientHeight;
    const visible = !((contRect.bottom <= maxVisibleY) || (contRect.top > maxVisibleY));

    scrollBlockRefEl.style.width = `${scrollWidth}px`;

    this.setState({contentRefEl, scrollRefEl, visible});
  }

  componentDidUpdate(prevProps, prevState) {
    const contentRefEl = ReactDOM.findDOMNode(this.props.contentRef.current);
    const scrollBlockRefEl = this.scrollBlockRef.current;
    const elToScroll = contentRefEl.getElementsByClassName(this.props.innerScrollableClass)[0];
    const scrollWidth = contentRefEl && elToScroll ? elToScroll.scrollWidth : 0;
    scrollBlockRefEl.style.width = `${scrollWidth}px`;
  }

  checkVisibility = () => {
    let visible = (parseInt(this.scrollBlockRef.current.style.width) > this.state.scrollRefEl.offsetWidth);

    if (visible) {
      let contRect = this.state.contentRefEl.getBoundingClientRect();
      let maxVisibleY = window.innerHeight || document.documentElement.clientHeight;
      visible = !((contRect.bottom <= maxVisibleY) || (contRect.top > maxVisibleY));
    }

    this.setState({visible});
  };

  syncSbar = (sender, preventSyncCont) => {
    if (this.state.preventSyncSbar) {
      this.setState({preventSyncSbar: false});
      return;
    }
    this.setState({preventSyncCont: !!preventSyncCont});
    this.scrollRef.current.scrollLeft = sender.scrollLeft;
  };

  syncCont = (sender, preventSyncSbar) => {
    const contentRefEl = ReactDOM.findDOMNode(this.props.contentRef.current);
    const elToScroll = contentRefEl.getElementsByClassName(this.props.innerScrollableClass)[0];

    if (this.state.preventSyncCont) {
      this.setState({preventSyncCont: false});
      return;
    }
    this.setState({preventSyncSbar: !!preventSyncSbar});
    if (contentRefEl && elToScroll) {
      elToScroll.scrollLeft = sender.scrollLeft;
    }
  };

  componentWillUnmount() {
    window.onscroll = null;
    window.onresize = null;

    const contentRefEl = ReactDOM.findDOMNode(this.props.contentRef.current);
    const elToScroll = contentRefEl.getElementsByClassName(this.props.innerScrollableClass)[0];
    const scrollRefEl = this.scrollRef.current;

    if (contentRefEl && elToScroll) {
      elToScroll.onscroll = null;
      elToScroll.onfocus = null;
    }

    if (scrollRefEl) {
      scrollRefEl.onscroll = null;
    }
  }

  render() {
    const {visible, contentRefEl} = this.state;

    return (
        <Fragment>
          {this.props.children}
          <div className={`fl-scrolls${!visible ? ' fl-scrolls-hidden' : ''}`}
               style={{width: `${contentRefEl ? contentRefEl.offsetWidth : 0}px`,
                 left: `${contentRefEl ? contentRefEl.getBoundingClientRect().left : 0}px`}}
               ref={this.scrollRef}>
            <div ref={this.scrollBlockRef}>
            </div>
          </div>
        </Fragment>);
  }
}

export default ReactFloatingScroll;
