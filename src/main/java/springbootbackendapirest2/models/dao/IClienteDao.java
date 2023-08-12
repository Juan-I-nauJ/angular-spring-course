package springbootbackendapirest2.models.dao;

import org.springframework.data.repository.CrudRepository;

import springbootbackendapirest2.models.entity.Cliente;

public interface IClienteDao extends CrudRepository<Cliente, Long> {

}
