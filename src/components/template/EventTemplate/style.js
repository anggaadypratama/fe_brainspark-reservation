import { makeStyles } from '@material-ui/core/styles';

const DetailEventStyle = makeStyles(({
  font: {
    raleway,
  },
  color,

}) => ({
  containerContent: {
    marginTop: 50,
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
    flexDirection: ({ isMedium }) => (isMedium ? 'column' : 'row'),
  },
  content: {
    maxWidth: ({ isMedium }) => (isMedium ? '100%' : '70%'),
    padding: '24px 0',
    borderRadius: 20,
  },
  contentTitle: {
    fontFamily: raleway,
    fontWeight: 800,
    color: color.primaryText,
    padding: 20,
    paddingTop: 0,
  },
  avatarImage: {
    height: 'inherit',
    width: 'inherit',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
}));

export default DetailEventStyle;