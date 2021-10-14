/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package reto3.reto3.Servicios;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reto3.reto3.Repositorio.RepositorioSkate;
import reto3.reto3.Repositorio.RepositorioSkate;
import reto3.reto3.Entidad.Skate;
import reto3.reto3.Entidad.Skate;

/**
 *
 * @author calix
 */
@Service
public class serviciosSkate {
    @Autowired
    private RepositorioSkate metodosCrud;
    
    public List<Skate> getAll(){
        return metodosCrud.getAll();
    }
    
    public Optional<Skate> getSkate(int id){
        return metodosCrud.getSkate(id);
    }
    
    public Skate save(Skate skate){
        if (skate.getId()==null){
            return metodosCrud.save(skate);
        }else{
            Optional<Skate> evt=metodosCrud.getSkate(skate.getId());
            if(evt.isEmpty()){
                return metodosCrud.save(skate);
            }else{
                return skate;
            }
        }
    }
}
