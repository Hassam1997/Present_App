import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: Metrics.baseMargin,
  },
  timeItem: {
    borderRadius: 36,
    marginLeft: Metrics.ratio(8),
    backgroundColor: Colors.WHITE,
    marginVertical: 6,
  },
  innerView: {
    borderRadius: 36,
    paddingVertical: 10,
    paddingHorizontal: Metrics.ratio(12),
  },
  time: {
    fontSize: 14,
    fontFamily: Fonts.manrope.semiBold,
    color: Colors.APP_TEXT,
  },
});
