import React from 'react';
import styles from '../project/ProjectCard.module.css';
import { BsFillTrashFill } from 'react-icons/bs';
const ServiceCard = ({ id, name, custo, description, handleRemove }) => {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id, custo);
  };

  return (
    <div className={styles.projectCard}>
      <h4>{name}</h4>
      <p>
        <span>Custo total:</span> R$ {custo}
      </p>
      <p>{description}</p>
      <div className={styles.projectCardActions}>
        <button onClick={remove}>
          <BsFillTrashFill />
          Excluir
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
