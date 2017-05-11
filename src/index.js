import dva from 'dva';
import createLoading from 'dva-loading';
import { browserHistory } from 'dva/router';
import { message } from 'antd';
import 'babel-polyfill';

// 1. Initialize
const app = dva({
  ...createLoading(),
  history: browserHistory,
  onError(error) {
    message.error(error.message);
  },
});

app.model(require("./models/app"));

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
