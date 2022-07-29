import { lighten, rgba } from 'polished';
import { useTransition } from 'react-spring';
import theme from '../theme';

export default function useHoverTransition(hoverState) {
  return useTransition(hoverState, {
    from: props => {
      const { pos, scroll } = props;
      return {
        top: `${pos.top + scroll}px`,
        left: `${pos.left}px`,
        width: `${pos.width}px`,
        height: `${pos.height}px`,
        background: rgba(theme.black, 1),
      };
    },
    enter: props => {
      const { pos, scroll, viewportWidth } = props;
      const defaultLeft = pos.left - pos.width / 4;
      const newWidth = pos.width * 1.5;
      const farthestRight = viewportWidth - newWidth - 30;
      const left = defaultLeft < 10 ? 10 : defaultLeft > farthestRight ? farthestRight : defaultLeft;

      return {
        top: `${pos.top + scroll - pos.height / 4}px`,
        left: `${left}px`,
        width: `${newWidth}px`,
        height: `${pos.height * 1.5 + 70}px`,
        background: rgba(lighten(0.07, theme.black), 1),
      };
    },
    leave: props => {
      const { pos, scroll } = props;
      return {
        top: `${pos.top + scroll}px`,
        left: `${pos.left}px`,
        width: `${pos.width}px`,
        height: `${pos.height}px`,
        background: rgba(theme.black, 1),
      };
    },
  });
}
