/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package reto3.reto3.Servicios;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reto3.reto3.Repositorio.RepositorioReservation;
import reto3.reto3.Entidad.Reservation;

@Service
public class serviciosReservation {
     @Autowired
    private RepositorioReservation metodosCrud;
    
    public List<Reservation> getAll(){
         return metodosCrud.getAll();
    }
    
    public Optional<Reservation> getReservation(int id){
        return metodosCrud.getReservation(id);
    }
    
    
    public Reservation save(Reservation reservation){
        if(reservation.getIdReservation()==null){
            return metodosCrud.save(reservation);
        }else{
            Optional<Reservation> evt=metodosCrud.getReservation(reservation.getIdReservation());
            if(evt.isEmpty()){
            return metodosCrud.save(reservation);
            }else{
                return reservation;
            }
        
        
        }
    
    }
    
    public Reservation update(Reservation reservation){
        if(reservation.getIdReservation()==null){
            return metodosCrud.save(reservation);
        }else{
            Optional<Reservation> e=metodosCrud.getReservation(reservation.getIdReservation());
            if(!e.isEmpty()){
                if(reservation.getStartDate()!=null){
                    e.get().setStartDate(reservation.getStartDate());
                }
                if(reservation.getDevolutionDate()!=null){
                    e.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if(reservation.getClient()!=null){
                    e.get().setClient(reservation.getClient());
                }
                metodosCrud.save(e.get());
                return e.get();
            }else{
                return reservation;
            }
        }
    }
    
    public boolean deleteReservation(int id){
        
        Boolean aBoolean=getReservation(id).map(reservation -> {
            metodosCrud.delete(reservation);
            return true;
        }).orElse(aBoolean=false);
        
        return aBoolean;
    }
}
