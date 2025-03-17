import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
    res.send("All jobs!");
  });


router.get("/:id", (req, res) => {
    const id = req.params.id;
    res.json({status: "OK", data: { id }});
  });


router.post("/", (req, res) =>{
    const body = req.body;
    res.json({status: "OK", messsage: "New job added successfully!", data: body});
});

router.put("/:id", (req, res) =>{
    const body = req.body;
    res.json({status: "OK", messsage: `Job with id $(req.params.id) updated successfully!`, data: body});
});

router.delete("/:id", (req, res) =>{
    const body = req.body;
    res.json({status: "OK", messsage: `Job with id $(req.params.id) deleted successfully!`, data: body});
});




  export default router;