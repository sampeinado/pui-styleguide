import React from 'react';
import ReactDOM from 'react-dom';

import 'pui-css-all';
import '../stylesheets/app.scss';

import Sidebar from './components/sidebar';
import MarkdownViewer from './components/markdown_viewer';
import contentMap, {attachPackagesToWindow} from './helpers/content';

attachPackagesToWindow();

class App extends React.Component {
  constructor(props) {
    super(props);

    const path = window.location.pathname.split('/').pop();
    this.state = {content: App.currentContent(path), path: path};
    this.updateContent = this.updateContent.bind(this);
  }

  componentDidMount() {
    window.addEventListener('popstate', (event) => {
      this.updatePath(event.currentTarget.location);
    }, false);
  }

  updateContent(href) {
    window.history.pushState({}, '', href);
    this.updatePath(window.location);
  }

  updatePath(location) {
    content.scrollTop = 0;
    const path = location.pathname.split('/').pop();
    this.setState({content: App.currentContent(path), path: path});
  }

  static currentContent(path) {
    return contentMap[path] || contentMap['404'];
  }

  render() {
    return (
      <div id="app" className="grid grid-nogutter">
        <div className="col col-fixed">
          <Sidebar updateContent={this.updateContent.bind(this)} activePath={this.state.path}/>
        </div>
        <div id="content" className="col content">
          <div id="wrapper">
            <MarkdownViewer json={this.state.content.json}
                            file={this.state.content.file}
                            name={this.state.content.name}/>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));