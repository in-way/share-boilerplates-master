import React, { Component } from 'react';

import Button from './components/Button';

// 如果你想看看你编译后的能否正常运行
import ButtonEs from './es';
import './es/index.css';

class App extends Component {
    render() {
        return (
            <div>
                展示你的组件
                <Button onClick={() => alert('click')}>示例</Button>
                <ButtonEs onClick={() => alert('click')}>编译后的按钮</ButtonEs>
            </div>
        );
    }
}

export default App;
