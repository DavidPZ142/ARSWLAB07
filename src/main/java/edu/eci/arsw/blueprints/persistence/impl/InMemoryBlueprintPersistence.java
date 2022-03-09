/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence.impl;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 *
 * @author hcadavid
 */
@Repository
@Qualifier("Memory")
public class InMemoryBlueprintPersistence implements BlueprintsPersistence{

    private final Map<Tuple<String,String>,Blueprint> blueprints=new ConcurrentHashMap<>();

    public InMemoryBlueprintPersistence() {
        //load stub data
        Point[] pts = new Point[]{new Point(140, 140), new Point(115, 115)};
        Point[] pts1 = new Point[]{new Point(160, 120), new Point(100, 121)};
        Point[] pts2 = new Point[]{new Point(134, 98), new Point(21, 34)};
        Point[] pts3 = new Point[]{new Point(121, 78), new Point(32, 34), new Point(200, 121), new Point(128, 34)};
        Point[] pts4 =new Point[]{new Point(154, 98),new Point(30, 134)};
        Point[] pts5 =new Point[]{new Point(10, 10),new Point(50, 10),new Point(10, 40),new Point(50, 40),new Point(30, 60)};
        Blueprint bp=new Blueprint("Nicolas",  "LaPiscina",pts);
        Blueprint bp1 = new Blueprint("David", "CampNou",pts1);
        Blueprint bp2 = new Blueprint("David", "Campin",pts2);
        Blueprint bp4 = new Blueprint("David", "Atanasio",pts3);
        Blueprint bp6 = new Blueprint("Nicolas", "Casa", pts5);
        Blueprint bp3 = new Blueprint("DaVinci", "Obelisco",pts1);
        blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        blueprints.put(new Tuple<>(bp1.getAuthor(),bp1.getName()), bp1);
        blueprints.put(new Tuple<>(bp2.getAuthor(),bp2.getName()), bp2);
        blueprints.put(new Tuple<>(bp3.getAuthor(),bp3.getName()), bp3);
        blueprints.put(new Tuple<>(bp4.getAuthor(),bp4.getName()), bp4);
        blueprints.put(new Tuple<>(bp6.getAuthor(),bp6.getName()), bp6);

        
    }    
    
    @Override
    public void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        if (blueprints.containsKey(new Tuple<>(bp.getAuthor(),bp.getName()))){
            throw new BlueprintPersistenceException("The given blueprint already exists: "+bp);
        }
        else{
            blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        }        
    }

    @Override
    public Blueprint getBlueprint(String author, String bprintname) throws BlueprintNotFoundException {
        return blueprints.get(new Tuple<>(author, bprintname));
    }

    @Override
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException {
        Set<Blueprint> hs = new HashSet<>();
        for(Tuple<String,String> i : blueprints.keySet()){
            if(i.o1.equals(author)){
                hs.add(blueprints.get(i));
            }
        }

        return hs;
    }

    @Override
    public Set<Blueprint> getAllBluePrints(){
        Set<Blueprint> hs = new HashSet<>();
        for(Tuple<String,String> i : blueprints.keySet()){
            hs.add(blueprints.get(i));
        }
        return hs;
    }

    @Override
    public void deleteBlueprint(String author, String name){
        blueprints.remove(new Tuple<>(author, name));
    }


}
