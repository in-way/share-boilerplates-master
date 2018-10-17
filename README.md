# 起步

## 一、安装
> 请确保你的node版本>=7.2   
> 有反馈说在node版本大于9.x.x以上运行会报错，所以也请确保node版本不要为10.x.x       
> 请确保npm的registry切换到公司的源：http://192.168.0.62:7001

推荐使用nrm管理你的npm源：  

```javascript
npm i -g nrm
nrm add sunsharing http://192.168.0.62:7001
// 这时输入nrm ls可以查看到有一个sunsharing选项
nrm use sunsharing
```

安装脚手架：

```javascript
npm install -g @yo/share-cli
// or
yarn global add @yo/share-cli
```

检测是否安装成功    

```javascript
share --version
// 如果安装成功，会输出以下内容
// current version of share-cli is x.x.x

// 查看帮助
share --help
```

## 二、初始化项目

```javascript
share new my-app
// 该命令会在当前命令行位置下创建一个my-app的文件夹
```
执行该命令后会进入一个交互模式，可以做一些简单的选择：  

-  选择一个模板
    - mpa，创建一个多页应用
    - spa，创建一个单页应用
    - scurd，创建一个在线表单项目
    - dve，创建一个大屏项目
    - component 如果你需要打包一个react组件的话
- 是否自动install依赖
- 选择一个包管理工具
    - yarn 【推荐】
    - npm

安装完后启动项目
```javascript
cd my-app
npm start
```
## 三、开发 
    
### 项目目录结构介绍（以mpa为例）   
    
在开始写代码前，先介绍下项目的目录结构：
```
│  .editorconfig
│  .eslintignore
│  .eslintrc
│  .gitignore
│  .npmrc
│  .prettierrc
│  package.json
│  webpack.config.js
│  yarn.lock
│
├─public
│      favicon.ico
│
└─src
    │  theme.js
    │
    ├─assets
    │  ├─fonts
    │  │
    │  ├─icons
    │  │
    │  └─images
    │
    ├─components
    │  ├─business
    │  │  └─Button
    │  │          Button.js
    │  │          index.js
    │  │
    │  └─ui
    │      ├─Button
    │      │      Button.js
    │      │      Button.less
    │      │      index.js
    │      │
    │      └─WhiteSpace
    │              index.js
    │              WhiteSpace.js
    │
    ├─config
    │      service.js
    │
    ├─layouts
    │      IndexPageLayout.js
    │
    ├─models
    │      example.js
    │      user.js
    │
    ├─pages
    │  ├─404
    │  │
    │  ├─index
    │  │
    │  └─template // 只是给你复制用的
    │      │  index.html
    │      │  index.js
    │      │  router.js
    │      │
    │      └─routes
    │              Home.js
    │
    ├─services
    │      user.js
    │
    └─utils
            index.js
            request.js
```
**你需要知道的：**
- webpack.config.js     
我们对webpack做了一层封装，屏蔽掉了一些你不需要关心的webpack配置，并把一些配置项暴露给webpack.config.js，具体使用说明请看[这篇文章](http://192.168.0.62:88/yo/share-kit)。

- public    
该文件夹的内容会原封不动的被copy到webpack的编译目录下。用来存放favicon.ico之类的。

- src/theme.js  
你可以在此定义一些变量提供给less使用    
    ```javascript
    // theme.js
    module.exports = {
        primary: 'red'
    };
    
    // your-style.less
    .container {
        background-color: @primary;
    }
    ```
    > 在项目中你可以使用less或者sass，根据你喜欢的来。但是目前theme.js只支持less

- src/assets    
请将项目相关的静态资源统一存放在这个地方。

- src/components    
项目中组件请都放在这边，区分业务和纯展示的组件。组件请以**文件夹**的形式存在。请将你的组件放在正确的文件夹下。  
文件夹至少包含两个文件：
    ```javascript
    // index.js
    import Button from './Button';
    
    export default Button;
    
    // Button.js
    import React from 'react'
    /**
    your code
    **/
    export default Button;
    
    // 如果有样式文件，则在文件夹下新建以组件命名的样式文件，如 Button.scss
    ```

- src/config    
存放项目的一些配置文件，比如接口信息。

- layouts   
如果你项目有一些通过的布局，可以在此处新建你的布局。

- models    
dva中的数据层，如果你项目不需要用到redux，可以不用关心这个，下面会介绍如何使用。

- pages     
在mpa下会存在这个文件夹。如果你需要新建一个页面，直接复制template文件夹然后重命名下，最后重启webpack就可以访问你新建的这个页面了。   

    > 不需要你再去编辑webpack的配置了

- services  
推荐在此管理你所有的网络请求。

- utils     
存放工具函数的地方。这边已经预先提供了一个**request.js**，是结合了yapi可以进行mock的一个fetch的封装。
    
### 示例介绍
npm star之后，你会看到下图的示例，分别介绍了使用dva和不使用dva的两种使用方式。下面就一步一步介绍这个例子是怎么写出来的。

![image](http://onmax8chu.bkt.clouddn.com//cli1.gif)

- 首先分析一下我们要做的这个东西，无非就是左右两个列表，列表中的项显示个人信息。然后点击**获取用户列表按钮**发起一个请求，并将请求到的数据新增到列表中。
    
- 在components/ui下新建UserList文件夹
> 这个列表只是负责渲染数据，是一个纯展示的组件，所以被归类到ui下。

```javascript
import React from 'react';

import styles from './UserList.scss'; // css_modules

const UserList = ({ data = [] }) => {
    return (
        <ul>
            {data.map((user, index) => {
                const { name, email, birth } = user;

                return (
                    <li className={styles.user_info} key={index}>
                        <p>姓名：{name}</p>
                        <p>出生年月：{birth}</p>
                        <p>邮箱：{email}</p>
                    </li>
                );
            })}
        </ul>
    );
};

export default UserList;
```        

> 这边用到了css_modules，项目中默认开启了css_modules，他会将我们的classname编译成一个独一无二的classname。如果想了解更多，[请参考这篇文章](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)。

- 现在我们需要发起网络请求来获取我们的用户列表（mock数据），现在webpack.config.js添加proxy配置
```javascript
proxy: {
    '/mockApi': {
        target: 'http://192.168.0.62:3000/mock/48',
        pathRewrite: { '^/mockApi': '' }
    },
    '/api': {
        target: 'http://www.prodenv.com/api',
        changeOrigin: true
    }
},
```

- 新建一个user的请求，首先在config/server下管理我们的接口地址       

```javascript
/* ============== 按照接口分类定义下列接口 ============== */

export const user = {
    getUserList: '/user/list'
};
```

- 然后在services文件夹下新建user.js     


```javascript
// services/user.js
import request from '../utils/request';

import { user as api } from '../config/service';

export function getUserList() {
    return request(api.getUserList, true);
}
// request的最后一个参数用来确定本此请求是否是mock数据
```     



- service配置好了，现在先让我们开始不使用dva的例子。在components/business下新建一个UserListA的文件夹

```javascript
// UserListA.js
// services
import { getUserList } from '../../../services/user';

// utils
import { sleep } from '../../../utils';

class UserListA extends Component {
    state = {
        userList: [],
        loading: false
    };

    requestData = async () => {
        this.setState({
            loading: true
        });
        await sleep(1500);
        const data = await getUserList();

        this.setState(
            ({ userList }) => {
                return {
                    loading: false,
                    userList: [...userList, ...data]
                };
            },
            () => {
                this.listContainer.scrollToBottom();
            }
        );
    };

    render() {
        const { userList, loading } = this.state;
        const userListClassNames = classNames(styles.box, styles.user_list);

        return (
            <div>
                <p className={styles.title}>不使用dva</p>
                <Scrollbars
                    ref={r => (this.listContainer = r)}
                    style={{ width: 420, height: 600 }}
                    className={userListClassNames}
                    autoHide
                >
                    <WhiteSpace size="small" />

                    <UserList data={userList} />
                    {loading && (
                        <div>
                            <Spin />
                            <p>加载中...</p>
                        </div>
                    )}
                    <Button onClick={this.requestData}>{userList.length > 0 ? '加载更多' : '获取用户列表'}</Button>
                    <WhiteSpace size="small" />
                </Scrollbars>
            </div>
        );
    }
}

```
其实大家都很熟悉这样的书写方式了，需要强调的是，放在business下的组件我们也可以称为容器组件，容器获取数据并把数据传递给他的子组件，我们应该在开发中尽量采用这样的组件配合方式：**容器组件（business） + 无状态组件（ui）**；

- 让我们来看看如果使用dva，同样的功能又要怎么实现呢？
> dva其实就是redux，应该是社区上redux最简洁的使用方案了。

- 这边简单提下几个redux概念
    - store 存放数据的地方
    - reducers 更改数据的地方
    - dispatch(action) 派发一个动作，可以理解为获取数据     
    > 是不是和mvc的mc对上号了？

- 在models下新建一个user.js的文件           

```javascript
// models/user.js
import * as usersService from '../services/user';

export default {
    namespace: 'user',

    state: {
        userList: [],
        loading: false
    },

    reducers: {
        loading(state, { status = false }) {
            return { ...state, loading: status };
        },
        updateUserList(state, { data }) {
            return {
                ...state,
                userList: [...state.userList, ...data]
            };
        }
    },

    effects: {
        *getUserList({ success }, { call, put }) {
            yield put({
                type: 'loading',
                status: true
            });

            try {
                const data = yield call(usersService.getUserList);

                yield put({
                    type: 'updateUserList',
                    data
                });

                success && success();
            } catch (e) {
                console.error('getuserList error =>', e);
            } finally {
                yield put({
                    type: 'loading',
                    status: false
                });
            }
        }
    }
};

```         

- reduces只能接收**同步的action**，所以有副作用（异步）的action都需要经过effects处理下；上述代码中也看到了state，而且跟刚才那个例子的state并没有任何区别，是的，借助dva（redux），我们已经把state提升到了组件树的顶端了。       

- 在reduces中的updateUserList中我们去更新了state（跟setState本质上并没有什么区别）      

- 接着回到**UserListB.js**中        

```javascript
class UserListB extends React.Component {
    requestData = () => {
        const { dispatch } = this.props;

        dispatch({
            type: 'user/getUserList',
            success: () => {
                this.listContainer.scrollToBottom();
            }
        });
    };

    render() {
        const { loading, userList } = this.props;

        const userListClassNames = classNames(styles.box, styles.user_list);

        return (
            <div>
                <p className={styles.title}>dva中的数据流</p>
                <Scrollbars
                    ref={r => (this.listContainer = r)}
                    style={{ width: 420, height: 600 }}
                    className={userListClassNames}
                    autoHide
                >
                    <WhiteSpace size="small" />

                    <UserList data={userList} />
                    {loading && (
                        <div>
                            <Spin />
                            <p>加载中...</p>
                        </div>
                    )}
                    <Button onClick={this.requestData}>{userList.length > 0 ? '加载更多' : '获取用户列表'}</Button>
                    <WhiteSpace size="small" />
                </Scrollbars>
            </div>
        );
    }
}

function mapStateToProps({ user }) {
    const { loading, userList } = user;

    return {
        loading,
        userList
    };
}

export default connect(mapStateToProps)(UserListB);
```     


大部分和上述例子没有任何区别，只不过这时候loading和userList不再从组件自己的state中获取了，而是通过props注入到了组件来了。

- 通过mapStateToProps可以将刚才model/user中的state转成组件的props       

```javascript
function mapStateToProps({ user }) {
    const { loading, userList } = user;

    return {
        loading,
        userList
    };
}

export default connect(mapStateToProps)(UserListB);
```

- requestData
通过dispatch，流程会走到model/user的effects的getUserList，接着触发reduces的updateUserList       


```javascript
requestData = () => {
    const { dispatch } = this.props;

    dispatch({
        type: 'user/getUserList',
        success: () => {
            this.listContainer.scrollToBottom();
        }
    });
};
```

到此，使用dva就是这么简单。

# 参考文章
- [dva](https://github.com/dvajs/dva)
- [share-kit](http://192.168.0.62:88/yo/share-kit)
- [dva-knowledgemap](https://github.com/dvajs/dva-knowledgemap)
- [antd-design-pro](https://github.com/ant-design/ant-design-pro)
- [阮一峰redux系列文章](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
- [阮一峰的css-modules教程](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)