import dva from 'dva';

// shareui
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '@share/shareui-html';
import '@share/shareui-font';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('../../models/user'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
