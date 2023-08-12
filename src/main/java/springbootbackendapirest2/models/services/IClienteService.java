package springbootbackendapirest2.models.services;

import java.util.List;

import springbootbackendapirest2.models.entity.Cliente;

public interface IClienteService {

	
	public List<Cliente> findAll();
	
}
