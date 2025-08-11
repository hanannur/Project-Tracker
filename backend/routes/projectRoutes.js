const express=require('express');
const router=express.Router();
const projectController=require('../controllers/projectController')


router.get('/' , projectController.getAll);
router.get('/:id' , projectController.getOne);
router.post('/' , projectController.create);
router.delete('/:id' , projectController.remove);
router.put('/:id' , projectController.update);


module.exports=router;