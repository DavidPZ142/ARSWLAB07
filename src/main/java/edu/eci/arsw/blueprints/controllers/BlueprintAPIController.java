/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.controllers;

import java.util.logging.Level;
import java.util.logging.Logger;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.services.BlueprintsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author hcadavid
 */
@RestController
@RequestMapping(value = "/v1/blueprint")


public class BlueprintAPIController {

    @Autowired
    private BlueprintsServices bps;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> bluePrints() {
        try {
            return new ResponseEntity<>(bps.getAllBlueprints(), HttpStatus.ACCEPTED);

        } catch (Exception e) {
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("Error bluprint no encontrado", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/{autor}")
    public ResponseEntity<?> getBlueprintsByAuthor(@PathVariable String autor){
        try{
            return new ResponseEntity<>(bps.getBlueprintsByAuthor(autor), HttpStatus.ACCEPTED);
        }catch(Exception e){
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("Autor no encontrado", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value ="/{autor}/{name}")
    public ResponseEntity<?> getBlueprints(@PathVariable String autor, @PathVariable  String name){
        try{
            return new ResponseEntity<>(bps.getBlueprint(autor, name), HttpStatus.ACCEPTED);
        }catch(Exception e){
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("No encontrado", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> addNewBlueprint(@RequestBody Blueprint blueprint){

        try{
            bps.addNewBlueprint(blueprint);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch(Exception e){
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("No se pudo crear ", HttpStatus.FORBIDDEN);
        }
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{autor}/{name}")
    public ResponseEntity<?> updateBlueprints(@PathVariable String autor, @PathVariable  String name, @RequestBody Blueprint blueprint) throws BlueprintNotFoundException {
        bps.deleteBlueprint(autor, name);
        try{
            bps.addNewBlueprint(blueprint);
            return new ResponseEntity<>(HttpStatus.CREATED);

        }catch(Exception e){
            Logger.getLogger(BlueprintAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("No se pudo crear ", HttpStatus.FORBIDDEN);
        }


    }


}

