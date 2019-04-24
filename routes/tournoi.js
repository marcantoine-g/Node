const fs = require('fs');

module.exports = {

    afficheTournois: (req,res) => {
        let query = "SELECT * FROM `tournoi` ORDER BY id ASC";

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('tournoi.ejs', {
                title: 'Mon tournoi de Tarot'
                ,tournois: result
            });
        });
    },
    addTournoiPage: (req,res) => {
        let query = "SELECT * FROM `joueur";

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('add-tournoi.ejs', {
                title: 'Mon tournoi de Tarot',
                message: '',
                players : result
            });
        });
    },
    addTournoi: (req, res) =>{
        let nb_tour = req.body.tour;
        let nb_table = req.body.table;
        let joueurs_nord = req.body.nord;
        let joueurs_sud = req.body.sud;
        let joueurs_est = req.body.est;
        let joueurs_ouest = req.body.ouest;
        let tmp = "";


        // Cas particulier ou on n'ajoute que une table 
        if(nb_table == 1){
            console.log(joueurs_nord);
            for (let i=0; i<joueurs_nord.length; i++){
                tmp += joueurs_nord[i];
            }
            joueurs_nord = Array(1);
            joueurs_nord[0]=tmp;
            tmp="";
        }

        if(nb_table == 1){
            for (let i=0; i<joueurs_sud.length; i++){
                tmp += joueurs_sud[i];
            }
            joueurs_sud = Array(1);
            joueurs_sud[0]=tmp;
            tmp="";
        }

        if(nb_table == 1){
            for (let i=0; i<joueurs_est.length; i++){
                tmp += joueurs_est[i];
            }
            joueurs_est = Array(1);
            joueurs_est[0]=tmp;
            tmp="";
        }

        if(nb_table == 1){
            for (let i=0; i<joueurs_ouest.length; i++){
                tmp += joueurs_ouest[i];
            }
            joueurs_ouest = Array(1);
            joueurs_ouest[0]=tmp;
            tmp="";
        }

        // Création d'un tournoi
        let queryCreationTournoi = "INSERT INTO `tournoi` (tour,score, encours) VALUES('"+nb_tour+"', '" + 0 +"', 1)";
    
        db.query(queryCreationTournoi, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }    
            id_tournoi = result.insertId;
            ajoutNord(id_tournoi);
            ajoutSud(id_tournoi);
            ajoutEst(id_tournoi);
            ajoutOuest(id_tournoi);
        });

        // Ajout des joueurs Nord
        function ajoutNord(id_tournoi){
            console.log(joueurs_nord);
            for (let i=0; i<joueurs_nord.length; i++){
                nom_prenom_nord = joueurs_nord[i].split(' ');
                let queryAjoutJoueurNord = "INSERT INTO `joueur` (nom, prenom, score, classement, id_tournoi) VALUES ('"+nom_prenom_nord[0]+"' , '"+nom_prenom_nord[1]+"','"+0 +"', '"+ 0 + "' , '"+id_tournoi+"')";
                
                db.query(queryAjoutJoueurNord, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    joueurs_nord[i] = result.insertId;
                }); 
            }
        }

        // Ajout des joueurs Sud
        function ajoutSud(id_tournoi){
            for (let i=0; i<joueurs_sud.length; i++){
                nom_prenom_sud = joueurs_sud[i].split(' ');
                let queryAjoutJoueurSud = "INSERT INTO `joueur` (nom, prenom, score, classement, id_tournoi) VALUES ('"+nom_prenom_sud[0]+"' , '"+nom_prenom_sud[1]+"','"+0 +"', '"+ 0 + "' , '"+id_tournoi+"')";
                
                db.query(queryAjoutJoueurSud, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    joueurs_sud[i] = result.insertId;
                }); 
            }    
        }

        // Ajout des joueurs Est
        function ajoutEst(id_tournoi){
            for (let i=0; i<joueurs_est.length; i++){
                nom_prenom_est = joueurs_est[i].split(' ');
                let queryAjoutJoueurEst = "INSERT INTO `joueur` (nom, prenom, score, classement, id_tournoi) VALUES ('"+nom_prenom_est[0]+"' , '"+nom_prenom_est[1]+"','"+0 +"', '"+ 0 + "' , '"+id_tournoi+"')";
                
                db.query(queryAjoutJoueurEst, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    joueurs_est[i] = result.insertId;
                }); 
            } 
        }

        // Ajout des joueurs Ouest
        function ajoutOuest(id_tournoi){
            for (let i=0; i<joueurs_ouest.length; i++){
                nom_prenom_ouest = joueurs_ouest[i].split(' ');
                let queryAjoutJoueurOuest = "INSERT INTO `joueur` (nom, prenom, score, classement, id_tournoi) VALUES ('"+nom_prenom_ouest[0]+"' , '"+nom_prenom_ouest[1]+"','"+0 +"', '"+ 0 + "' , '"+id_tournoi+"')";
                
                db.query(queryAjoutJoueurOuest, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    joueurs_ouest[i] = result.insertId;
                }); 
            }   
        }

        // Création des tables
        setTimeout(function(){
            for (let i=0; i<nb_table; i++){
                let queryCreationTable = "INSERT INTO `table`(somme_point, nord, sud, est, ouest, id_tournoi) VALUES("+0+", "+joueurs_nord[i]+" , "+joueurs_sud[i]+" , "+joueurs_est[i]+" , "+joueurs_ouest[i]+" , "+id_tournoi+" )";
                
                db.query(queryCreationTable, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    
                    let query = "SELECT * FROM `tournoi` ORDER BY id ASC";

                    db.query(query, (err, result) => {
                        if (err) {
                            res.redirect('/');
                        }
                        res.render('tournoi.ejs', {
                            title: 'Mon tournoi de Tarot'
                            ,tournois: result
                        });
                    });
                });   
            }
        }, 500); 
    },


    deleteTournoi: (req, res) => {
        let tournoiId = req.params.id;
        let query = 'DELETE FROM tournoi WHERE id = "' + tournoiId + '"';

                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/tournois');
                });
    },
    afficheTournoi: (req, res) => {
        let tournoiId = req.params.id;
        let queryTournoiEnCours = "SELECT * FROM `tournoi` WHERE id =" + tournoiId;
        let queryTable = "SELECT * FROM `table` WHERE `id_tournoi`=" + tournoiId;
        let queryJoueur = "SELECT * FROM `joueur` WHERE `id_tournoi` = " + tournoiId;
        let nb_tour = 1;
        let changer_bouton = false;



        if (req.body.table_id){
            console.log(req.body);
            let table_id = req.body.table_id;
            let joueur_nord = req.body.joueur_nord;
            let joueur_sud = req.body.joueur_sud;
            let joueur_est = req.body.joueur_est;
            let joueur_ouest = req.body.joueur_sud;
            let score_nord = req.body.score_nord;
            let score_sud = req.body.score_sud;
            let score_est = req.body.score_est;
            let score_ouest = req.body.score_ouest;

            for(let i=0; i<table_id.length; i++){
                if(Array.isArray(score_nord)){
                    score_nord = score_nord[i];
                }
                if(Array.isArray(score_sud)){
                    score_sud = score_sud[i];
                }
                if(Array.isArray(score_est)){
                    score_est = score_est[i];
                }
                if(Array.isArray(score_ouest)){
                    score_ouest = score_ouest[i];
                }
                if(Array.isArray(joueur_nord)){
                    joueur_nord = joueur_nord[i];
                }
                if(Array.isArray(joueur_sud)){
                    joueur_sud = joueur_sud[i];
                }
                if(Array.isArray(joueur_est)){
                    joueur_est = joueur_est[i];
                }
                if(Array.isArray(joueur_ouest)){
                    joueur_ouest = joueur_ouest[i];
                }
                db.query("UPDATE `joueur` SET `score` ="+score_nord+" WHERE `id`="+joueur_nord , (err,result)=>{
                    if (err){
                        return res.status(500).send(err);
                    }
                });
                db.query("UPDATE `joueur` SET `score` ="+score_sud+" WHERE `id`="+joueur_sud , (err,result)=>{
                    if (err){
                        return res.status(500).send(err);
                    }
                });
                db.query("UPDATE `joueur` SET `score` ="+score_est+" WHERE `id`="+joueur_est , (err,result)=>{
                    if (err){
                        return res.status(500).send(err);
                    }
                });
                db.query("UPDATE `joueur` SET `score` ="+score_ouest+" WHERE `id`="+joueur_ouest , (err,result)=>{
                    if (err){
                        return res.status(500).send(err);
                    }
                });
            }
        }

        db.query(queryTournoiEnCours, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            Object.keys(result).forEach(function (key) {
                var row = result[key];
                if (row.encours == 0) { // tournoi pas en cours => déjà passé , afficher les scores du tournoi passé (via bouton menu auquel on passe un id ?)
                    res.redirect('/tournoi/'+tournoiId+'/recap');
                }
                else {
                    tour_max=row.tour;
                    db.query(queryTable, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        tables = result;
                        db.query(queryJoueur, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            joueurs = result;

                            if(req.body.nb_tour){
                                if(req.body.nb_tour < tour_max ) {
                                    nb_tour = parseInt(req.body.nb_tour)+ 1;
                                } else {
                                    changer_bouton = true;
                                }
                            }
                            
                            res.render('tournoi-en-cours.ejs', {
                                title: 'Mon tournoi de Tarot',
                                tables: tables,
                                joueurs: joueurs,
                                tournoiId: tournoiId,
                                nb_tour: nb_tour,
                                tour_max : tour_max,
                                changer_bouton : changer_bouton
                            });
                        });
                    });
                }
            });
        });
    },
    recapTournoi : (req, res) => {
        
        if (req.body.table_id){
            let table_id = req.body.table_id;
            let joueur_nord = req.body.joueur_nord;
            let joueur_sud = req.body.joueur_sud;
            let joueur_est = req.body.joueur_est;
            let joueur_ouest = req.body.joueur_sud;
            let score_nord = req.body.score_nord;
            let score_sud = req.body.score_sud;
            let score_est = req.body.score_est;
            let score_ouest = req.body.score_ouest;

            for(let i=0; i<table_id.length; i++){
                db.query("UPDATE `joueur` SET `score` ="+score_nord[i]+" WHERE `id`="+joueur_nord[i] , (err,result)=>{
                    if (err){
                        return res.status(500).send(err);
                    }
                });
                db.query("UPDATE `joueur` SET `score` ="+score_sud[i]+" WHERE `id`="+joueur_sud[i] , (err,result)=>{
                    if (err){
                        return res.status(500).send(err);
                    }
                });
                db.query("UPDATE `joueur` SET `score` ="+score_est[i]+" WHERE `id`="+joueur_est[i] , (err,result)=>{
                    if (err){
                        return res.status(500).send(err);
                    }
                });
                db.query("UPDATE `joueur` SET `score` ="+score_ouest[i]+" WHERE `id`="+joueur_ouest[i] , (err,result)=>{
                    if (err){
                        return res.status(500).send(err);
                    }
                });
            }
        }

        let tournoiId = req.params.id;
        let queryTournoiFini = "UPDATE `tournoi` SET `encours`=0 WHERE `id` = "+tournoiId;
        let queryJoueur = "SELECT * FROM `joueur` WHERE `id_tournoi` = " + tournoiId;

        db.query(queryTournoiFini , (err, result)=> {
            if (err) {
                return res.status(500).send(err);
            }
        });

        db.query(queryJoueur , (err,result)=>{
            if (err) {
                return res.status(500).send(err);
            }
            joueurs = result;

            let classement = Array(joueurs.length);
            for (let i=0; i<joueurs.length; i++){
                classement[i] = {id: joueurs[i].id, score: joueurs[i].score};
            }

            classement.sort(function (a,b) {
                return -(a.score - b.score);
            });

            for (let i=0; i<classement.length; i++){
                let queryAssignementClassement = "UPDATE `joueur` SET `classement` ="+parseInt(i+1)+" WHERE `id`="+classement[i].id;
                db.query(queryAssignementClassement , (err, result)=> {
                    if (err) {
                        return res.status(500).send(err);
                    }
                });
            }
            let querySortClassement = "SELECT * FROM `joueur` WHERE `id_tournoi` = "+tournoiId+" ORDER BY `classement`";
                db.query(querySortClassement , (err, result)=> {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    joueurs = result;
                    res.render('recap-tournoi.ejs', {
                        tournoiId : tournoiId,
                        joueurs : joueurs
                    });
                });  

        });
    }
};