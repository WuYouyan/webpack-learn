import jquery from 'jquery';
// import dayjs from 'dayjs'; // dayjs is a substitute (more compact) for moment,
import moment from 'moment';
import 'moment/locale/zh-cn'; // import language package manually instead of import all language packages from locale of moment module

moment.locale('zh-cn'); // new webpack.IgnorePlugin(/\.\/locale/, /moment/) will not import language module
                        // need import zh-cn manually
                        // by default 'en'

moment().endOf('day').fromNow();
console.log("moment().endOf('day').fromNow()", moment().endOf('day').fromNow());

