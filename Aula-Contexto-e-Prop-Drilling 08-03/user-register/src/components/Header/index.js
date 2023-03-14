import useUser from '../../hooks/useUser';
import './styles.css';
import UserContext from "../../contexts/UserContext.js";

function Header() {
  const { name } = useUser(UserContext)
  return (
    <header>
      Bem vindo, {name}!
    </header>
  )
}

export default Header;