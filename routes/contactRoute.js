const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// http://localhost:8090
router.route("/")
    .get((req, res) => {
        // récupère tous les objets
        Contact.find()
            .then((data) => {
                res.render('home', {contact: data});
                console.log(data);
            } )
    });

// http://localhost:8090
router.route('/contact/new')
    .get((req, res)=> {
        res.render('add-item', { errors : ''})
    })
    .post((req, res) => {
        let errors = "";

        if(req.body.lastName == ""){
            errors += "Last name is required"
        }
        if(req.body.firstName == ""){
            errors += "First name is required"
        }
        if(req.body.company == ""){
            errors += "Le champs date n'est pas renseigné"
        }
        if(req.body.address == ""){
            errors += "Le champs date n'est pas renseigné"
        }
        if(req.body.address == ""){
            errors += "Le champs date n'est pas renseigné"
        }
        if(req.body.emailAddress == ""){
            errors += "Le champs date n'est pas renseigné"
        }
        if(req.body.phoneNumber == ""){
            errors += "Le champs date n'est pas renseigné"
        }
        if(req.body.fieldOfWork == ""){
            errors += "Le champs date n'est pas renseigné"
        }
        if(errors != "") {
            res.render('add-item', {
                errors: errors
            })
        }
        else {
            let contact = new Contact(req.body);
            contact.save()
            .then((data) =>  res.redirect(('/')))
        }
    })

// route : localhost:port/api/
router.route("/contact/delete/:id")
    .get((req,res) => {
        Contact.deleteOne({_id: req.params.id})
            .then((data) => res.redirect(('/')))
    })

router.route('/contact/edit/:id')
    .get((req, res)=> {
        Contact.findById((req.params.id))
            .then((contact) => {
                res.render('edit-item', { errors : '', contact});
                console.log(contact.id)
            });
    })
    .post((req, res) => {
        let errors = "";
        let br = "<br>";
        if(req.body.lastName == ""){
            errors += "Last name is required " + br
        }
        if(req.body.firstName == ""){
            errors += "First name is required"
        }
        if(req.body.company == ""){
            errors += "Company is required"
        }
        if(req.body.address == ""){
            errors += "Address is required"
        }
        if(req.body.emailAddress == ""){
            errors += "Email address is required"
        }
        if(req.body.phoneNumber == ""){
            errors += "Phone number is required"
        }
        if(req.body.fieldOfWork == ""){
            errors += "Field of work is required"
        }
        if(errors != "") {
            res.render('edit-item', {
                errors: errors
            })
        }
        else {
            Contact.updateOne({_id: req.params.id}, req.body)
                .then(() =>  res.redirect(('/')))
        }
    })


module.exports = router;
