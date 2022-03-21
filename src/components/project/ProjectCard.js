import React from 'react';
import styles from './ProjectCard.module.css';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
const ProjectCard = ({ id, name, orcamento, categoria, handleRemove }) => {
  const remove = (e) => {
    e.preventDefault(); //não deixa nenhum outro evento que executaria, executar
    handleRemove(id);
  };

  return (
    <div className={styles.projectCard}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento:</span> R$ {orcamento}
      </p>
      <p className={styles.categoryText}>
        {/* acessa a categoria pelos estilos e deixa os nomes todos em minusculos para que peguem as configurações dadas no css */}
        <span className={`${styles[categoria.toLowerCase()]}`}></span>
        {categoria}
      </p>
      <div className={styles.projectCardActions}>
        <Link to={`/project/${id}`}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
