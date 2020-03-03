/**
 * ArchivosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let Procedures = Object();
var firebase = require("firebase");
Procedures.file = async(req, res)=>{

    req.file('file').upload({
      dirname: require('path').resolve(sails.config.appPath, 'assets/images')
    },function (err, uploadFiles) {
      if (err) return res.serverError(err);
      //sails.log.info(98, uploadFiles);
      uploadFiles = uploadFiles[0].fd;
      uploadFiles = (uploadFiles.split("images"))[1];
      res.ok('images'+uploadFiles);
    });
    /*req.file('file').upload({
        //dirname: require('path').resolve(sails.config.appPath, 'assets/images')
        dirname: require('path').resolve(sails.config.appPath, '.tmp/public/images')
    },function (err, uploadFiles) {
        if(err){
            return reject(err);
        }
        // sails.log.info(98, uploadFiles);
        req.file('file').upload(function (err, uploadFiles) {
            if(err){
                return reject(err);
            }
            // sails.log.info(98, uploadFiles);
            uploadFiles = uploadFiles[0].fd;
            uploadFiles = (uploadFiles.split("images"))[1];
            res.ok('images'+uploadFiles);
        })
        ;
        //res.ok(uploadFiles);
    })
    ;*/
}

module.exports = Procedures;

