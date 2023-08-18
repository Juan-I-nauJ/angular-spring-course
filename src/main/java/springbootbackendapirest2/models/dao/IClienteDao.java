package springbootbackendapirest2.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import springbootbackendapirest2.models.entity.Cliente;

public interface IClienteDao extends JpaRepository<Cliente, Long> {

}
