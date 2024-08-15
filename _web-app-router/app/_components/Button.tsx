type Props = {
  onClick: () => void;
};

const Button = ({ onClick }: Props) => (
  <button onClick={() => onClick()}>Sign out</button>
);

export default Button;
