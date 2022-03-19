import React, { useState, useEffect } from 'react';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css';

const ProjectForm = ({ handleSubmit, btnText, projectData }) => {
  //HOOK
  // hook para as categorias da api
  const [categories, setCategories] = useState([]); // estado inicial

  // verificação se vem algum projeto pronto ou se não vem
  const [project, setProject] = useState(projectData || {});

  // onde recebe essa resposta do fetch e preenche os dados uma vez só
  useEffect(
    () => {
      // requisição da api criada
      fetch('http://localhost:5000/categories', {
        // método que vai pegar o item da api
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }, // indica que quero receber um json
      }) // then é a resposta da api
        .then((resposta) => resposta.json()) // retorna o dado em json
        .then((data) => {
          setCategories(data);
        }) // foi pego os dados em json e foi setado no setCategories
        .catch((erro) => console.log(erro));
    },
    [], // estado inicial do useEffect
  );

  const submit = (e) => {
    e.preventDefault(); // previne o padrão que seria enviar o método e depois retorna a página
    handleSubmit(project); // executa o método que foi passado pela prop e passa o projeto cadastrado no formulário como argumento
    // console.log(project);
  };

  // método que altera o nome do projeto nessa função
  function handleChange(e) {
    // irá alterar o nome do projeto aqui
    // desestrutura o project que é o state
    // o [e.target.name] que é o nome do input vai ser igual ':' a e.target.value
    setProject({ ...project, [e.target.name]: e.target.value });
    // independente do input que eu preencher vai mudar alguma propriedade desse item que for de texto

    //console.log(project); mostra o formulário sendo preenchido
  }

  //método que irá alterar o item selecionado
  function handleCategory(e) {
    //vou querer mudar o category
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
        //com isso consigo saber qual opção foi selecionada pelo seu index
      },
    }); // nesse método eu já sei que estou alterando somente o category pois somente ele está sendo selecionado
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do Projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={project.name ? project.name : ''}
      />

      <Input
        type="number"
        text="Orçamento do Projeto"
        name="orcamento"
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
        value={project.orcamento ? project.orcamento : ''}
      />

      <Select
        name="categoriaID"
        text="Selecione a categoria"
        options={categories}
        handleOnChange={handleCategory}
        // bug resolvido de selecionar a categoria e não selecionar
        // se eu tiver um project.category eu vou passar o project.category.id se não eu passo um elemento vazio
        value={project.category ? project.category.id : ''}
      />
      <SubmitButton text={btnText} />
    </form>
  );
};

export default ProjectForm;
