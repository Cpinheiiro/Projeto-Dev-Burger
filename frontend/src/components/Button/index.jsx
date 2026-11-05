import { ContainerButton } from './styles.js';

export function Button({ children, ...props }) {
  console.log(props);
  return <ContainerButton {...props}>{children}</ContainerButton>;
}
