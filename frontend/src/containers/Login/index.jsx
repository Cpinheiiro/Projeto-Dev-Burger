import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import Logo from '../../assets/logo-dev.png';
import { Button } from '../../components/Button';
import { api } from '../../services/api.js';
import {
  Container,
  LeftContainer,
  RightContainer,
  Tittle,
  Form,
  InputContainer,
  Link,
} from './styles.js';

export function Login() {
  const navigate = useNavigate();

  const schema = yup
    .object({
      email: yup
        .string()
        .email('Digite um email válido')
        .required('Campo obrigatório'),
      password: yup
        .string()
        .min(6, 'Mínimo 6 caracteres')
        .required('Campo obrigatório'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const onSubmit = async (data) => {
    try {
      const {
        data: { token },
      } = await toast.promise(
        api.post('/sessions', {
          email: data.email,
          password: data.password,
        }),
        {
          pending: 'Verificando seus dados',
          success: 'Seja Bem vindo(a)!',
          error: 'Email ou senha incorretos',
        }
      );

      setTimeout(() => {
        navigate('/');
      }, 2000);

      localStorage.setItem('token', token);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="Logo" />
      </LeftContainer>
      <RightContainer>
        <Tittle>
          Olá, seja bem vindo ao <span>Dev Burguer</span>!
          <br />
          Acesse com seu <span> Login e senha.</span>
        </Tittle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Email</label>
            <input type="email" {...register('email')} />
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Senha</label>
            <input type="password" {...register('password')} />
            <p>{errors?.password?.message}</p>
          </InputContainer>
          <Button type="submit">Entrar</Button>
        </Form>
        <p>
          Não possui uma conta? <Link to="/cadastro">Clique aqui.</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
